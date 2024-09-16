import { useCallback, useEffect } from "react";
import { useState } from "react";


const CheckDuplicateText = () => {
    const heading = "Duplicate Sentences";
    const [URL, setURL] = useState('');
    const [sentences, setSentences] = useState([]);
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
          const response = await fetch('http://16.171.134.100:8080/api/extractDuplicateSentences', {
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
            const extractedSentences = responseData.duplicateSentences;
            setSentences(extractedSentences);
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
    

    return (
        <div className="container">
            <div className="row">

                <div className="col-lg-4 col-md-12 col-sm-12">
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
                       <p>Enter the URL of the website you want to check for duplicate content in the provided input field and click on the "Scrape" button.</p>
                   </div>
                   <div class="info">
                       <h2>What You Will Get:</h2>
                       <p>Once the scraping and duplicate content checking are complete, you will receive a report detailing any duplicate content found on the specified webpage. This includes:</p>
                       <ul>
                           <li><strong>Duplicate Text:</strong> Sections of text that appear more than once on the webpage, which may indicate repetitive or redundant content.</li>
                           <li><strong>Content Similarities:</strong> Highlights of text similarities that might be present on different parts of the page or across multiple pages.</li>
                       </ul>
                       <p>This data will be displayed in a clear and organized format, allowing you to review and address any duplicate content issues effectively.</p>
                   </div>
               </div>
                }


                {isSubmitted && 
                <div className="col-lg-8 col-md-6 col-sm-6">
                    <div className="row justify-content-center">
                        <h2>{heading}</h2></div>

                    <div className="row justify-content-center">
                        <div className="row">
                        <ol>
                            {sentences.map((sentence, index) => (
                                <li key={index}>{sentence}</li>
                            ))}
                        </ol>
                        </div>
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

export default CheckDuplicateText;