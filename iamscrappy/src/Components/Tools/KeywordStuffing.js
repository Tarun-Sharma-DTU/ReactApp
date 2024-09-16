import { useCallback, useEffect } from "react";
import { useState } from "react";


const KeywordStuffing = () => {
    const heading = "Result";
    const [URL, setURL] = useState('');
    const [density, setDensity] = useState(" ");
    const [count, setCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTextChange = (event) => {
        setURL(event.target.value);
    };

    const handlekeywordChange = (event) => {
        setKeyword(event.target.value);
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
          url: URL,
          keyword: keyword
        };
      
        console.log('Payload:', payload); // Log the payload
      
        try {
          const response = await fetch('http://localhost:8080/api/extractKeywordStuffing', {
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
            setCount(responseData.count);
            setDensity(responseData.density);
            setIsSubmitted(true);
            setLoading(false);
            
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
                        <h2><label className="form-label">Enter Keyword</label></h2>
                        <input type="text border border-danger" onChange={handlekeywordChange} className="form-control" value={keyword} />
                        <button className="btn btn-primary mt-2" onClick={scrapfun}>Scrap</button>
                    </div>
                </div>

                {!isSubmitted && 
                     <div class="content">
                     <div class="info">
                         <h2>How to Use:</h2>
                         <p>Enter the URL of the webpage and Keyword you want to check for keyword stuffing in the provided input field and click on the "Scrape" button.</p>
                     </div>
                     <div class="info">
                         <h2>What You Will Get:</h2>
                         <p>Once the scraping and keyword stuffing check are complete, you will receive a report detailing any instances of keyword stuffing on the specified webpage. This includes:</p>
                         <ul>
                             <li><strong>Keyword Frequency:</strong> A count of how often specific keywords or phrases appear on the page.</li>
                             <li><strong>Overuse Indicators:</strong> Highlights of excessive use of particular keywords that might negatively impact SEO or readability.</li>
                             <li><strong>Recommendations:</strong> Suggestions for optimizing keyword usage to improve content quality and search engine ranking.</li>
                         </ul>
                         <p>This data will be displayed in a clear and organized format, helping you identify and correct any issues with keyword stuffing effectively.</p>
                     </div>
                 </div>
                }
                

                
                <div className="col-lg-2"></div>

                {isSubmitted && 
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="row justify-content-center">
                        <h2>{heading}</h2></div>

                    <div className="">
                        {isSubmitted && <p>Keyword "{keyword}" has "{density}" density in {URL}. {keyword} occurs {count} times in {URL}</p>}
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

export default KeywordStuffing;