import { Form } from "react-router-dom";
import { UserPlusIcon } from '@heroicons/react/24/solid'
import illustration from "../assets/illustration.jpg"

const Intro = () => {
  return (
    <div className="intro">
        <div>
            <h1>Have a Say over <span className="accent">Your Money</span></h1>
            <p>
                Personal Budgeting is the best way out of lack and wants. Learn to start budgeting now.
            </p>
            <Form method="post">
                <input 
                    type="text"
                    name="userName"
                    required
                    placeholder="Enter your name"
                    aria-aria-label="Your Name"
                    autoComplete="given-name"
                />
                <input type="hidden" name="_action" value="newUser" />
                <button className="btn btn--dark">
                    <UserPlusIcon width={20} />
                    <span>Create Account</span>
                </button>
            </Form>
        </div>
        <img src={illustration} alt="The man with the money" width={600} />
    </div>
  )
}

export default Intro