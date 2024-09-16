import { useCallback, useEffect } from "react";
import { useState } from "react";
import './css/scrap.css';

const ScrapEmailsPhone = () => {
    const emailheading = "Emails";
    const phoneheading = "Phone Numbers";
    const [URL, setURL] = useState('');
    const [emails, setEmails] = useState([]);
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleTextChange = (event) => {
        setURL(event.target.value);
    };

    function checkURL(url) {
        if (url.includes("http://") || url.includes("https://")) {
            return true;
        } else return false;
    }

    const scrapfun = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!URL || !checkURL(URL)) {
            alert('Please provide valid URL.');
            return;
        }

        const payload = {
            url: URL
        };

        console.log('Payload:', payload); // Log the payload

        try {
            const response = await fetch('http://16.171.134.100:8080/api/scrapeWebsite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            console.log('Response status:', response.status); // Log the response status

            if (response.ok) {
                const responseData = await response.json();
                console.log('Response data:', responseData); // Log the response data
                const extractedEmails = responseData.emails;
                setEmails(extractedEmails);
                const extractedPhones = responseData.phones;
                setPhones(extractedPhones);
                setLoading(false);
                setIsSubmitted(true);

                // Handle the response data as needed
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyEmails = useCallback(() => {
        navigator.clipboard.writeText(emails.join('\n'));
    }, [emails]);

    const copyPhones = useCallback(() => {
        navigator.clipboard.writeText(phones.join('\n'));
    }, [phones]);

    return (
        <div className="container">
            <div className="row">

                <div className="col-lg-4 col-md-12 col-sm-12 form">
                    <div className="row justify-content-center">
                        <h2><label className="form-label">Enter URL</label></h2>
                        <input type="text" className="form-control border border-danger" onChange={handleTextChange} value={URL} />
                        <button className="btn btn-primary mt-2" onClick={scrapfun}>Scrap</button>
                    </div>
                </div>


                {isSubmitted &&
                <div className="col-lg-4 col-md-6 col-sm-6 content1">
                    <div className="row justify-content-center">
                        <h2>{emailheading}</h2>
                    </div>

                    <div className="row justify-content-center">
                        <div className="row">
                            <ol>
                                {emails.map((email, index) => (
                                    <li key={index}>{email}</li>
                                ))}
                            </ol>
                        </div>
                    </div> 

                     
                    <div className="row justify-content-center content2">
                    { isSubmitted &&  <button type="button" className="btn btn-info" onClick={copyEmails}>Copy</button>}
                    </div>
                </div> }

                {!isSubmitted &&
                <div class="content">
                <div class="info">
                    <h2>How to Use:</h2>
                    <p>Enter the URL of the website you want to scrape in the provided input field and click on the "Scrape" button.</p>
                </div>
                <div class="info">
                    <h2>What You Will Get:</h2>
                    <p>Once the scraping is complete, you will receive a list of extracted email addresses and phone numbers from the specified webpage.</p>
                    <p>This data will be displayed in a clear and organized format, allowing you to easily review and use the contact information.</p>
                </div>
            </div>
                }

                
                {isSubmitted &&
                <div className="col-lg-4 col-md-6 col-sm-6">
                 <div className="row justify-content-center">
                        <h2>{phoneheading}</h2>
                    </div>

                    <div className="row justify-content-center">
                        <div className="row">
                            <ol>
                                {phones.map((phone, index) => (
                                    <li key={index}>{phone}</li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                       { isSubmitted && <button type="button" className="btn btn-info" onClick={copyPhones}>Copy</button>}
                    </div>
                </div>    }

                {loading && (
                    <div id="preloader">
                        <div id="loader"></div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ScrapEmailsPhone;