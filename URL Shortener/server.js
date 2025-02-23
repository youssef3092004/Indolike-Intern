require ('dotenv').config ();
const axios = require ('axios');

async function shortenLinks (link) {
  try {
    const response = await axios.post (
      `https://api-ssl.bitly.com/v4/shorten`,
      {
        long_url: link,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.link;
  } catch (error) {
    console.log ('error:', error);
  }
}

(async () => {
  const link = 'https://www.google.com';
  const result = await shortenLinks (link);
  console.log (result);
}) ();
