import React from 'react';

const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a className="border-bottom text-secondary" href="#">TARUN SHARMA</a>, All Rights Reserved.
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        
                    </div>
                </div>
            </div>
            <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
        </div>
    );
};

export default Footer;
