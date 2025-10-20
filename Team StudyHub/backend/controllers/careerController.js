export async function getJobs(req,res,next){ try{ res.json([]) }catch(e){ next(e) } }
export async function getJobById(req,res,next){ try{ res.json({ id: req.params.id, title:'Mock Job' }) }catch(e){ next(e) } }
export async function applyToJob(req,res,next){ try{ res.json({ success:true }) }catch(e){ next(e) } }
export async function getCompanies(req,res,next){ try{ res.json([]) }catch(e){ next(e) } }
