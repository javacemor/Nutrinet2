import React from 'react'

function Footer() {
    return (
        <>
          	<footer className="footer bg-dark py-2">
                <div className="container grid grid-3">
                    <div>
                        <h1>The Nutrinet</h1>
                        <p>Copyright &copy; 2021 </p>
                    </div>

                    <nav>
                        <ul>
                            <li><a href="#">Blog</a></li>
                            <li><a href="register.html">Register</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a href="about.html">About</a></li>
                        </ul>
                    </nav>

                    <div className="social">
                        <a href="#"> <i className="fab fa-pinterest fa-2x"></i></a>
                        <a href="#"> <i className="fab fa-facebook fa-2x"></i></a>
                        <a href="#"> <i className="fab fa-instagram fa-2x"></i></a>
                        <a href="#"> <i className="fab fa-twitter fa-2x"></i></a>
                    </div>
                </div>
            </footer>  
        </>
    )
}

export default Footer;
