export async function generateTest(req,res,next){
  try{ res.json({ success:true, test: { id: Date.now().toString() } }) }catch(e){ next(e) }
}
export async function submitTest(req,res,next){
  try{ res.json({ success:true, score: 0 }) }catch(e){ next(e) }
}
