import React from "react";
import notFounded from "../../Utils/notfounded.png"
import './error.css';

export default class Error extends React.Component {
    render() {
        return (
            <div className='error-url'>
                <img src={notFounded} alt='notFound' />
                <p>That Url Does Not Exist</p>
            </div>
        )
    }
}