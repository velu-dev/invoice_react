import React, { Component } from "react";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { subscriptionValidationSchema, Breadcrumb, ButtonLoader, numberOnly } from 'components';
import { addSubscription, getSubscription, updateSubscription, subscriptionPlans } from 'redux/actions';
import { Formik, ErrorMessage, Field, FieldArray } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';

const mapStateToProps = ({ subscription }) => {
  const { subscription_plans, subscriptions, subscription_detail } = subscription;
  return { subscription_detail, subscription_plans, subscriptions };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscription: (formData) => {
      dispatch(addSubscription(formData))
    },
    getSubscription: (id) => {
      dispatch(getSubscription(id))
    },
    updateSubscription: (formData, id) => {
      dispatch(updateSubscription(formData, id))
    },
    subscriptionPlans: (formData) => {
      dispatch(subscriptionPlans(formData))
    }
  }
}

const initialFormState = {
  plan_name: '',
  description: '',
  benefits: [''],
  price: '',
  validity_in_days: ''
};

class SubscriptionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subscription_plans: [],
      formState: initialFormState
    };

    this.isEdit = (props.formType === "Edit") ? true : false;
    this.isView = (props.formType === "View") ? true : false;
    this.isAdd = (props.formType === "Add") ? true : false;
    this.id = props.match.params.id;
    this.formikActions = {};
  }

  componentDidMount() {
    if (this.isEdit || this.isView) {
      this.props.getSubscription(this.id);
    }
    this.props.subscriptionPlans();
  }

  componentWillReceiveProps(newprops) {
    /*Subscription Details */
    if (this.props.subscriptions !== newprops.subscriptions) {
      if (newprops.subscriptions.status) {
        this.formikActions.resetForm();
        this.props.history.push(this.props.backUrl);
        toast.success(newprops.subscriptions.message);
      } else {
        if (newprops.subscriptions.errors) {
          this.formikActions.setSubmitting(false);
          this.formikActions.setErrors(newprops.subscriptions.errors);
        }
      }
    }

    if (!_.isEmpty(newprops.subscription_detail.data) && this.isAdd === false) {
      this.setState({ formState: newprops.subscription_detail.data })
    }

    /*Subscription plan list */
    if (!_.isEmpty(newprops.subscription_plans.data)) {
      this.setState({ subscription_plans: newprops.subscription_plans.data })
    }

  }
  render() {
    const { match } = this.props;
    const { formState } = this.state;
    return (
      <div className="main-content">
        <Breadcrumb match={match} />
        <div className="subscription-list-page-content">
          <div className="card">
            <div className="card-header">
              <h2>Subscription Details</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className={`card-body ${(this.isView)? 'remove-mandatory':''}`}>
              <Formik
                initialValues={formState}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                  this.formikActions = actions;
                  if (this.isEdit) {
                    this.props.updateSubscription(values, formState.id);
                  } else {
                    this.props.addSubscription(values);
                  }
                  actions.setSubmitting(true);
                }}
                validationSchema={subscriptionValidationSchema}

              >
                {({
            handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  isSubmitting,
                  setFieldValue,
                  errors
            }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Row className="content-row">
                        <Col md={5} className="">
                          <Form.Group>
                            <Form.Label>Name <span>*</span></Form.Label>
                            <Field
                              name="plan_name"
                              placeholder="Enter Name"
                              maxLength={40}  
                              value={values.plan_name}
                              className={'form-control' + (errors.plan_name && touched.plan_name ? ' is-invalid' : '')}
                              disabled={this.isView}
                            />
                            <ErrorMessage name="plan_name" component="div" className="invalid-feedback" />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Validity (Days) <span>*</span></Form.Label>
                            <Field
                              name="validity_in_days"
                              placeholder="Enter Validity"
                              onChange={e => numberOnly(e, setFieldValue)}
                              maxLength={4}
                              value={values.validity_in_days}
                              className={'form-control' + (errors.validity_in_days && touched.validity_in_days ? ' is-invalid' : '')}
                              disabled={this.isView}
                            />
                            <ErrorMessage name="validity_in_days" component="div" className="invalid-feedback" />
                          </Form.Group>
                          <Form.Group className="price-group">
                            <Form.Label>Price <span>*</span></Form.Label>
                            <div className="icon-set"><IcomoonReact iconSet={iconSet} color="#000" size={13} icon="dollar" /></div>
                            <Field
                              name="price"
                              placeholder="Enter Price"
                              value={values.price}
                              onChange={e => numberOnly(e, setFieldValue)}
                              maxLength={12}
                              className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')}
                              disabled={this.isView}
                            />
                            <ErrorMessage name="price" component="div" className="invalid-feedback" />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Benefits <span>*</span></Form.Label>
                            <FieldArray
                              name="benefits"
                              render={arrayHelpers => (
                                <div className="benefit-inputs">
                                  {values.benefits && values.benefits.length > 0 ? (
                                    values.benefits.map((benefit, index) => (
                                      <div className="benefit-input-wrap" key={index} >
                                        <Field
                                          name={`benefits.${index}`}
                                          placeholder="Enter Benefit"
                                          maxLength={64}
                                          className={'form-control' + (errors.benefits && touched.benefits && values.benefits[index] === "" ? ' is-invalid' : '')}
                                          disabled={this.isView}
                                        />
                                        

                                        {(values.benefits.length !== 1 && this.isView === false) ? (<span onClick={() => arrayHelpers.remove(index)}
                                        > <IcomoonReact iconSet={iconSet} color="#0086c5" size={24} icon="Minus" /> </span>) : null}

                                        {(((values.benefits.length - 1) === index || values.benefits.length === 1) && this.isView === false) ? (<span onClick={() => arrayHelpers.insert(values.benefits.length, '')}
                                        > <IcomoonReact iconSet={iconSet} color="#0086c5" size={24} icon="plus" /> </span>) : null}
                                        <ErrorMessage name={`benefits.${index}`} component="div" className="invalid-feedback" />
                                      </div>
                                    ))
                                  ) : null}
                                </div>
                              )}
                            />
                          </Form.Group>

                        </Col>
                        <Col md={7} className="">
                          <Form.Group>
                            <Form.Label>Description <span>*</span></Form.Label>
                            <Field
                              name="description"
                              component="textarea"
                              placeholder="Enter Description"
                              rows={7}
                              maxLength={500}
                              value={values.description}
                              className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')}
                              disabled={this.isView}
                            />
                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                      </Form.Row>

                      {!this.isView ?
                        (<div className="button-row">
                          <Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>{(this.isEdit) ? "UPDATE" : "SAVE"} {(isSubmitting) ? <ButtonLoader /> : null}</Button>
                          <Link to={this.props.backUrl} className="btn btn-custom btn-link">Cancel</Link>
                        </div>
                        ) : <div className="button-row"><Link to={this.props.backUrl} className="btn btn-custom btn-back" variant="success">Back</Link></div>
                      }
                    </Form>
                  )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SubscriptionFormConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionForm);
export default SubscriptionFormConnected;





