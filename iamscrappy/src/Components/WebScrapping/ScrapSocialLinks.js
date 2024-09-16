import { useCallback, useEffect } from "react";
import { useState } from "react";
import './css/scrap.css';


const ScrapSocialLinks = () => {
    const socialheading = "Social URLs";
    const phoneheading = "Phone Numbers";
    const [URL, setURL] = useState('');
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleTextChange = (event) => {
        setURL(event.target.value);
    };

    function checkURL( url){
        if(url.includes("http://") || url.includes("https://")){
            return true;
        }else return false;
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
          const response = await fetch('http://16.171.134.100:8080/api/extractSocialMediaLinks', {
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
            const extractSocialMediaLinks = responseData.socialMediaLinks;
            setLinks(extractSocialMediaLinks);
            setLoading(false);
            setIsSubmitted(true);
            
            // Handle the response data as needed
          } else {
            
          }
        } catch (error) {
          console.error('Error:', error);
          
        } finally {
          setLoading(false);
        }
      };


    const copyLinks = useCallback(() => {
        navigator.clipboard.writeText(links.join('\n'));
    }, [links]);
    

    return (
        <div className="container">
            <div className="">

                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="row justify-content-center">
                        <h2><label className="form-label">Enter URL</label></h2>
                        <input type="text border border-danger" onChange={handleTextChange} className="form-control" value={URL} />
                        <button className="btn btn-primary mt-2" onClick={scrapfun}>Scrap</button>
                    </div>
                </div>

                {!isSubmitted && 
                    <div class="content">
                    <div class="info">
                        <h2>How to Use:</h2>
                        <p>Enter the URL of the website you want to scrape for social media links in the provided input field and click on the "Scrape" button.</p>
                    </div>
                    <div class="info">
                        <h2>What You Will Get:</h2>
                        <p>Once the scraping is complete, you will receive a list of social media links found on the specified webpage. This includes:</p>
                        <ul>
                            <li>Links to popular social media platforms such as Facebook, Twitter, LinkedIn, Instagram, etc.</li>
                            <li>Direct URLs to the social media profiles or pages associated with the website.</li>
                        </ul>
                        <p>This data will be displayed in a clear and organized format, allowing you to easily access or use the social media links.</p>
                    </div>
                </div>
                }


                {isSubmitted && 
                <div className="col-lg-8 col-md-6 col-sm-6">
                    <div className="row justify-content-center">
                        <h2>{socialheading}</h2></div>

                    <div className="row justify-content-center">
                        <div className="row">
                        <ol>
                            {links.map((link, index) => (
                                <li key={index}><a href={link}>{link}</a></li>
                            ))}
                        </ol>
                        </div>
                    </div>

                    <div className="row justify-content-center content2">
                     {  isSubmitted && <button type="button" className="btn btn-info" onClick={copyLinks}>Copy</button>}
                    </div>
                </div>}

                {loading && (
                <div id="preloader">
                <div id="loader"></div>
                </div>) }

            </div>
        </div>
    );
};

export default ScrapSocialLinks;