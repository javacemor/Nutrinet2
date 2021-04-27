import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar';

function ContactScreen() {
    return (
        <>
            <Navbar />
              <section className="contact">
                <div className="contact-content">
                    <h2>Contact Us</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum veniam recusandae ipsa! Eius,
                        laudantium! Cupiditate in ipsam, iure earum, quas, 
                        vitae adipisci neque perspiciatis laboriosam accusamus ratione quo facilis dolores.
                    </p>
                </div>
                <div className="contact-container">
                    <div className="contactInfo">
                        <div className="contact-box">
                            <div className="contact-icon">
                                <i className="fa fa-map-marker-alt"></i>
                            </div>
                            <div className="contact-text">
                                <h3>Address</h3>
                                <p>
                                    No 45 Nutrinet Ave, sit amet consectetur adipisicing elit. Ipsa, 
                                    libero dicta qui possimus alias dolor. 
                                </p>
                            </div>
                        </div>
                        <div className="contact-box">
                            <div className="contact-icon">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div className="contact-text">
                                <h3>Phone</h3>
                                <p>
                                    +34 234 668 234, +123 456 789
                                </p>
                            </div>
                        </div>
                        <div className="contact-box">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="contact-text">
                                <h3>Email</h3>
                                <p>
                                    info@thenutrinet.com, support@thenutrinet.com
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="contactForm">
                        <form action="#">
                            <h2>Send Message</h2>
                            <div className="inputBox">
                                <input type="text" required />
                                <span>Full Name</span>
                            </div>
                            <div className="inputBox">
                                <input type="text" required />
                                <span>Email</span>
                            </div>
                            <div className="inputBox">
                                <textarea name="" id="" required rows="7"></textarea>
                                <span>Type your message...</span>
                            </div>
                            <div className="inputBox">
                                <input type="submit" value="Send" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>  

            <Footer />
        </>
    )
}

export default ContactScreen;
