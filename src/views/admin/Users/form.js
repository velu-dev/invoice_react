import React, { Component, Fragment } from "react";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FormLoader,  userValidationSchema, Breadcrumb, ButtonLoader, whiteSpaceTrim, numberOnly } from 'components';
import { assetURL, cardBrands } from '_constants';
import { addUser, getUser, updateUser, subscriptionPlans } from 'redux/actions';
import { Formik, ErrorMessage, Field } from 'formik';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const mapStateToProps = ({ adminUsers, subscription }) => { 
  const { user, userDetail, loading } = adminUsers;
  const { subscription_plans } = subscription;
  return { loading, user, userDetail, subscription_plans };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (formData) => {
      dispatch(addUser(formData))
    },
    getUser: (id) => {    
      dispatch(getUser(id))
    },
    updateUser: (formData, id) => {
      dispatch(updateUser(formData, id))
    },
    subscriptionPlans: (formData) => {
      dispatch(subscriptionPlans(formData))
    }
  }
}

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  subscription_id: '',
  card_number:'',
  card_name:''
};



class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subscription_plans: [],
      formState: initialFormState
    };
    this.textInput = React.createRef();
    this.isEdit = (props.formType === "Edit") ? true : false;
    this.isView = (props.formType === "View") ? true : false;
    this.isAdd = (props.formType === "Add") ? true : false;
    this.userId = props.match.params.id;
    this.formikActions = {};   
    // this.formik = {};   
  }

  setFormNode = (node) => this.form = node
  // getSubmitButtonNode = (input) =>{    
  //   return  this.form.querySelector(`input[name="${input}"]`)
  //  }

  componentDidMount() {
 
    if (this.isEdit || this.isView) {
      this.props.getUser(this.userId);
    }
    this.props.subscriptionPlans();    
    // this.getSubmitButtonNode('name').focus()
  }
  componentWillReceiveProps(newprops) {    
    /*User Details */
    if (this.props.user !== newprops.user) {
      if (newprops.user.status) {      
        this.formikActions.resetForm();
        this.props.history.push(this.props.backUrl);
        toast.success(newprops.user.message);
      } else {
        if (newprops.user.errors) {
          this.formikActions.setSubmitting(false);
          this.formikActions.setErrors(newprops.user.errors);
        }
      }
    }
    /*User List */
    if (!_.isEmpty(newprops.userDetail.data) && this.isAdd === false) {
      this.setState({ formState: newprops.userDetail.data })
    }

    /*Subscription plan list */
    if (!_.isEmpty(newprops.subscription_plans.data)) {
      this.setState({ subscription_plans: newprops.subscription_plans.data })
    }  

  }

  
  render() {
    const { match, loading } = this.props;
    const { formState, subscription_plans } = this.state; 
    return (
        <div className="main-content">
         <Breadcrumb match={match} />
          <div className="user-list-page-content">
          <div className="card">
            <div className="card-header">
              <h2>User Information</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className={`card-body ${(this.isView)? 'remove-mandatory':''}`}>
            { (_.isEmpty(this.formikActions) && loading) ? <FormLoader/> : 
        <Formik
          // ref={node => this.formik = node}  
          initialValues={formState}  
          enableReinitialize={true}        
          onSubmit={(values, actions) => { 
            this.formikActions = actions;              
            if (this.isEdit) {
              this.props.updateUser(values, formState.id);
            } else {
              this.props.addUser(values);
            }
            actions.setSubmitting(true);
          }}
          validationSchema={userValidationSchema}
          // validate={(value)=>{
          //   console.log(this.formik.state);
          //   if(this.formik.state.previousSubmitCount === undefined){
          //     this.formik.state.previousSubmitCount = 0;
          //   }
          //  console.log(this.formik.state.previousSubmitCount, this.formik.state.submitCount)
          // if(this.formik.state.previousSubmitCount < this.formik.state.submitCount){
          //    let inputs = _.keys(initialFormState);
          //    let focus = false; 
          //    let errors = this.formik.state.errors;
          //    console.log(inputs);
          //     inputs.map((inputName)=>{          
          //       if(!_.isEmpty(errors) && _.includes(_.keys(errors), inputName) && !focus){
          //         console.log('come')
          //         focus = true;
          //         this.formik.state.previousSubmitCount = this.formik.state.submitCount;
          //         // this.getSubmitButtonNode(inputName).focus() 
          //       }
          //    });
          //   } 
          // }}
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
            
              <Form onSubmit={handleSubmit} ref={this.setFormNode}>
                <Form.Row className="content-row">
                  <Form.Group as={Col} md="5" controlId="validationFormik01">
                    <Form.Label>Name <span>*</span></Form.Label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter Name"                         
                      maxLength={40}                      
                      value={values.name} 
                      className={`form-control ${(errors.name && touched.name ? 'is-invalid' : '')}`}
                      disabled={this.isView}
                    />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                  </Form.Group>
                  <Form.Group as={Col} md={7} controlId="validationFormik02">
                    <Form.Label>Email ID <span>*</span></Form.Label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Enter Email ID"
                      maxLength={64} 
                      value={values.email}                  
                      onChange={e => whiteSpaceTrim(e, setFieldValue)}
                      className={`form-control ${(errors.email && touched.email ? 'is-invalid' : '')}`}
                      disabled={this.isView}
                    />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </Form.Group>
                  <Form.Group as={Col} md="5" controlId="validationFormik03">
                    <Form.Label>Phone Number <span>*</span></Form.Label>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={values.phone}   
                      maxLength={13}                   
                      onChange={e => numberOnly(e, setFieldValue)}
                      className={`form-control ${(errors.phone && touched.phone ? 'is-invalid' : '')}`}
                      disabled={this.isView}
                    />
                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                  </Form.Group>
                  <Form.Group as={Col} md="7" controlId="validationFormik04">
                    <Form.Label>Subscribed Plan <span>*</span></Form.Label>
                    <select
                      name="subscription_id"
                      value={values.subscription_id}
                      onChange={(handleChange)}
                      onBlur={handleBlur}
                      className={`form-control ${(errors.subscription_id && touched.subscription_id ? 'is-invalid' : '')}`}
                      disabled={this.isView}
                    >
                      <option value="" label="Select Plan" />
                      {
                        subscription_plans.map((plan, key) => {
                          return (
                            <Fragment key={key}>
                              <option value={`${plan.id}`} label={`${plan.name}`} />
                            </Fragment>
                          )
                        })
                      }
                    </select>
                    <ErrorMessage name="subscription_id" component="div" className="invalid-feedback" />
                  </Form.Group>
                  {this.isView ?(
                  <Form.Group as={Col} md="5" controlId="validationFormik03">
                    <Form.Label>Card Details <span>*</span></Form.Label>
                    <div className="card-brand-input">
                      <Field
                        type="text"
                        name="card_number"                    
                        value={`************${values.card_number}`}
                        className={'form-control'}
                        disabled={true}
                      />{/*values.card_name*/}
                      { 
                        (_.includes(cardBrands, values.card_brand)) ?
                        <span className="card_icon"><Image src={`${assetURL}images/cardbrands/${values.card_brand}.png`} width="50px" alt={values.card_brand} /></span>
                        :
                        <span className="card_icon"><Image src={`${assetURL}images/cardbrands/blank-card.png`} alt={values.card_brand} width="50px"/></span>
                      }
                      <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                    </div>
                  </Form.Group>
                  ):null } 
                </Form.Row>
                {!this.isView ?
                  (<div className="button-row">
                    <Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>{(this.isEdit) ? "Update" : "Save"} {(isSubmitting) ? <ButtonLoader /> : null}</Button>
                    <Link to={this.props.backUrl}  className="btn btn-custom btn-link">Cancel</Link>
                  </div> 
                  ) : <div className="button-row"><Link to={this.props.backUrl} className="btn btn-custom btn-back" variant="success">Back</Link></div>

                }
              </Form>
            )}
        </Formik>
            }
        </div>
        </div>
        </div>
        </div>
    );
  }
}

const UserFormConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
export default UserFormConnected;
