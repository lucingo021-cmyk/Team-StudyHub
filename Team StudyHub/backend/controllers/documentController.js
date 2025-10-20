export async function getDocuments(req,res,next){
  try{ res.json([]) }catch(e){ next(e) }
}
export async function uploadDocument(req,res,next){
  try{ res.json({ success:true }) }catch(e){ next(e) }
}
export async function deleteDocument(req,res,next){
  try{ res.json({ success:true }) }catch(e){ next(e) }
}
