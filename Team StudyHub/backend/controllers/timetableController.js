export async function generateTimetable(req,res,next){
  try{ res.json({ success:true, timetable: { id: Date.now() } }) }catch(e){ next(e) }
}
export async function getTimetables(req,res,next){
  try{ res.json([]) }catch(e){ next(e) }
}
