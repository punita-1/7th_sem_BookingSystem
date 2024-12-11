import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import "./mailList.css";

const MailList = () => {
  const [state, handleSubmit] = useForm("mdkovpdv");

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      {state.succeeded ? (
        <div className="successMessage">
          <span>Thank you for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mailInputContainer">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <button type="submit" disabled={state.submitting}>
              Subscribe
            </button>
          </div>
          {state.errors && state.errors.length > 0 && (
            <div className="errorMessage">
              <span>There was an error. Please try again.</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default MailList;
