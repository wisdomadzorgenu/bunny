module.exports =  (req,res) => {
   //last route that is called when no route(request route) has been matched
   res.status(404).send("Page or resource not found");
}
