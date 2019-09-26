import React, { Component } from "react";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { authService,  accountSettingValidationSchema, ButtonLoader, Breadcrumb, whiteSpaceTrim, numberOnly } from 'components';
import ChangePasswordModal from 'views/common/ChangePasswordModal';
import { authUpdate, getAdminUser } from 'redux/actions';
import { Formik, ErrorMessage, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const mapStateToProps = ({ authUser }) => {
  const { auth_user, auth_update } = authUser; 
  return { auth_user, auth_update };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUpdate: (formData) => {
      dispatch(authUpdate(formData))
    },
    getAdminUser: () => {
      dispatch(getAdminUser())
    }
  }
}

const initialFormState = {
  email: '',
  phone: ''
};

class settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formState: initialFormState,
      modalShow: false,
    };
    this.formikActions = {};
  }

  componentDidMount() {
    this.props.getAdminUser();
  }

  componentWillReceiveProps({auth_update, auth_user, loading}) {
    /*User Details */
    if (!loading) {
      if (this.props.auth_update !== auth_update) {
        if (auth_update.status) { 
          if(auth_update.email_updated){
            authService.adminSignout(()=>{
              this.props.history.push('/admin');
              toast.success(auth_update.message);
            });
          }else{
            toast.success(auth_update.message);
          }       
        
        } else {
          if (auth_update.errors) {           
            this.formikActions.setErrors(auth_update.errors);
          }
        }
        this.formikActions.setSubmitting(false);
      }

      if (!_.isEmpty(auth_user.data)) {
        this.setState({ formState: auth_user.data })
      }
    }

  }

  render() {
    const { match } = this.props;
    const { formState } = this.state;
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="main-content">
       <Breadcrumb match={match}/>
        <div className="setting-page-content">
          <div className="card">
            <div className="card-header">
              <Button className="btn-change-password" onClick={() => this.setState({ modalShow: true})} >Change Password</Button>
              <h2>Account settings</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
             
            </div>
            <div className="card-body">
              <Formik
                initialValues={formState}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                  this.formikActions = actions;
                  // alert();
                  this.props.authUpdate(values);
                  actions.setSubmitting(true);
                }}
                validationSchema={accountSettingValidationSchema}
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
                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                          <Form.Label>Email <span className="req">*</span></Form.Label>
                          <Field
                            type="text"
                            name="email"
                            placeholder="Enter Email ID"
                            value={values.email}
                            maxLength={64}
                            onChange={e => whiteSpaceTrim(e, setFieldValue)}
                            className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}                           
                          />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik03">
                          <Form.Label>Phone Number <span className="req">*</span></Form.Label>
                          <Field
                            type="text"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={values.phone} 
                            maxLength={13}
                            onChange={e => numberOnly(e, setFieldValue)}  
                            className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')}                          
                          />
                          <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                        </Form.Group>
                      </Form.Row>
                      
                      <div className="button-row"><Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>Update {(isSubmitting) ? <ButtonLoader /> : null}</Button>
                      <Link to={`/admin`}  className="btn btn-custom btn-link">Cancel</Link>
                      </div>
                    </Form>
                  )}
              </Formik>
              <ChangePasswordModal
                show={this.state.modalShow}               
                onHide={modalClose}
                title="subscription"
                {...this.props}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const settingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(settings);
export default settingsConnected;
