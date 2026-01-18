import { useEffect, useState } from 'react'
import ShowQoute from './ShowQuote';



function Quotes() {

    const [quotes, setQuotes] = useState([])
    const [quotesFilter, setQuotesFilter] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(true);
    const [newquote, setNewquote] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('https://api.api-ninjas.com/v2/randomquotes',
                    {
                        headers: { 'X-Api-Key': 'JnNyTOYfNr5lmTH7ucmz4xY9QwGJIhrEqM2TczD3' }
                    }
                );
                if (!response.ok) {
                    throw new Error('bad');
                }
                let data = await response.json();
                let newQuotes: any = [...quotes, data]
                setQuotes(newQuotes);
                setQuotesFilter(newQuotes)
                setError(null);
            } catch (err: any) {
                console.log(err.message)
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };
        fetchData()
    }, [newquote]);

    if (loading) {
        return <h1 className='loading'>loading...</h1>
    }
    if (error) {
        return <div>Error: {JSON.stringify(error)}</div>;
    }
    const filter = () => {
        setQuotesFilter(quotesFilter.filter(quote => (JSON.stringify(quote[0]['author'])) == ('"' + input + '"')))
    }

    return (
        <>
        

            <div style={{ textAlign: 'center',marginTop:'15px' }}>
                <button className='buttonGetQuote' onClick={() => { setNewquote(!newquote) }}>to add a qoute</button>
            </div>
            <div className='filter'>
                filter <input placeholder="author" onChange={(e) => { setInput(e.target.value) }} />
                <button className='buttonfilter' onClick={filter} >do filter</button>
            </div>
            <div>

                {quotesFilter.map((quote, index) => (<div key={index}>
                    <ShowQoute qoute={(JSON.stringify(quote[0]['quote']))}
                        author={(JSON.stringify(quote[0]['author']))}
                        categories={(JSON.stringify(quote[0]['categories']))} />
                </div>))}
            </div>

      

        </>
    )

}
export default Quotes

