import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51TcJrEJMblfeTPgY3voCHcela1BO1q26djcl0Xca7rbWOthiSfHsmrqg2tiX4KbaPBSyOBaprVb0b3ddTNUU4Jrq00V6jXdr71');

const StripeWrapper = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;