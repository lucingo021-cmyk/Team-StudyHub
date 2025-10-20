export async function sendMessage(req,res,next){
  try{ res.json({ success:true, chatId: req.params.chatId, message: req.body.message }) }catch(e){ next(e) }
}
