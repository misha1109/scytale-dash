export const sendHttp = (controller) => {
  return (req, res) => {
    const data = controller(req, res);
    res.send(data);
  };
};
