import React from 'react';

const Contact = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');

    const namechange = (e) => {
        setName(e.target.value);
    }

    const emailchange = (e) => {
        setEmail(e.target.value);
    }

    const subjectchange = (e) => {
        setSubject(e.target.value);
    }

    const messagechange = (e) => {
        setMessage(e.target.value);
    }


    const submitform = (e) => {
        e.preventDefault();
        if (!name || !email || !subject || !message) {
            alert('Please fill all the details');
        }
        else {
            alert('Form Submitted Successfully');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        }
    }

  return (
    <div className="container-xxl pb-5" id="contact">
      <div className="container">
        <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-6">
            <h1 className="display-5 mb-0">Let's Work Together</h1>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-5 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <p className="mb-2">Call me:</p>
            <a href='tel:+919315348183'><h3 className="fw-bold">+91-9315348183</h3></a>
            <hr className="w-100" />
            <p className="mb-2">Mail me:</p>
            <h3 className="fw-bold"><a href='mailto:tarunsharmadeveloper@gmail.com'>tarunsharmadeveloper@gmail.com</a></h3>
            <hr className="w-100" />
            <p className="mb-2">Follow me:</p>
            <div className="d-flex pt-2">
              <a className="btn btn-square btn-primary me-2" href="https://www.youtube.com/@TarunSharma-developer"><i className="fab fa-youtube"></i></a>
              <a className="btn btn-square btn-primary me-2" href="https://www.linkedin.com/in/tarun-sharma-web-developer-delhi/"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-lg-7 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="name" onChange={namechange}  value={name} placeholder="Your Name" />
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="email" className="form-control" id="email" onChange={emailchange} value={email} placeholder="Your Email" />
                    <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="subject" onChange={subjectchange}  value={subject} placeholder="Subject" />
                    <label htmlFor="subject">Subject</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a message here" onChange={messagechange}  value={message} id="message" style={{ height: '100px' }}></textarea>
                    <label htmlFor="message">Message</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary py-3 px-5" onClick={submitform} type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
