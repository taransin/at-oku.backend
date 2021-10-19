

export default () => (error, req, res, next) => {
  if (error instanceof Error) {
    console.error(error.stack);
    return res.status(500).json({ error: error.message });
  }
  console.error(JSON.stringify(error));
  return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
};
