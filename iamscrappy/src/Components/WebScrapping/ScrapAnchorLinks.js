import { useCallback, useEffect } from "react";
import { useState } from "react";
import './css/scrap.css';


const ScrapAnchorLinks = () => {
    const emailheading = "Anchor Text";
    const phoneheading = "Links";
    const [URL, setURL] = useState('');
    const [anchors, setAnchors] = useState([]);
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

    const removeEmptyStrings = (arr) => {
        return arr.filter(str => str.trim() !== '');
    };

    

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
          const response = await fetch('http://16.171.134.100:8080/api/scanAnchors', {
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
            const extractedAnchors = responseData.anchors;
            setAnchors(extractedAnchors);
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
        navigator.clipboard.writeText(anchors.map(anchor => anchor.url).join('\n'));
    }, [anchors]);

    const copyText = useCallback(() => {
        navigator.clipboard.writeText(anchors.map(anchor => anchor.text).join('\n'));
    }, [anchors]);
    

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
                       <p>Enter the URL of the website you want to scrape for anchor tags and links in the provided input field and click on the "Scrape" button.</p>
                   </div>
                   <div class="info">
                       <h2>What You Will Get:</h2>
                       <p>Once the scraping is complete, you will receive a list of anchor tags and links found on the specified webpage. This includes:</p>
                       <ul>
                           <li><strong>Anchor Tags:</strong> HTML elements containing hyperlinks, showing text or labels that point to other pages or resources.</li>
                           <li><strong>Links:</strong> Direct URLs extracted from the anchor tags, which may include internal links (within the same site) and external links (pointing to other sites).</li>
                       </ul>
                       <p>This data will be displayed in a clear and organized format, allowing you to easily review, use, or analyze the links and anchor tags.</p>
                   </div>
                   </div>
                }


                {isSubmitted && 
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="row justify-content-center">
                        <h2>{emailheading}</h2></div>

                    <div className="wrapped-list">
                        <ol className="text-wrap">
                            {anchors.map((anchor, index) => (
                                    anchor.text.length > 0 && (
                                        <li key={index}>
                                            <a href={anchor.url}>{anchor.text}</a>
                                        </li>
                                    )
                                ))}
                        </ol>
                    </div>

                    <div className="row justify-content-center content2">
                     { isSubmitted &&  <button type="button" className="btn btn-info" onClick={copyText}>Copy</button> }
                    </div>
                </div> }

                
                {isSubmitted && 
                <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="row justify-content-center">
                        <h2>{phoneheading}</h2>
                    </div>

                        <ol className="wrapped-list">
                        {anchors.map((anchor, index) => (
                                    anchor.text.length > 0 && (
                                        <li key={index}>
                                            <a href={anchor.url}>{anchor.url}</a>
                                        </li>
                                    )
                                ))}
                        </ol>

                        <div className="row justify-content-center content2">
                { isSubmitted &&    <button type="button" className="btn btn-info" onClick={copyLinks}>Copy</button>}
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

export default ScrapAnchorLinks;