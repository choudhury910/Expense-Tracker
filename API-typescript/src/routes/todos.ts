import {Router} from 'express'
import { URLSearchParams } from 'url';
import {todo} from '../models/todo'

const router=Router()

let todos:todo[]=[];

type requestBody={text:string}
type requestParams={id:string}

router.get('/',(req,res,next)=>{
    return res.status(200).json({todos:todos})
})

router.post('/todos',(req,res,next)=>{
    const body=req.body as requestBody
    const newTodo:todo={
        id:new Date().toISOString(),
        text:body.text
    }
    todos.push(newTodo)
    return res.status(201).json({todo:newTodo})
})

router.post('/delete/:id',(req,res,next)=>{
    const params=req.params as requestParams
    const id=params.id;
    let found:boolean=false;
    todos=todos.filter(todo=>{
        if(todo.id==id)
        found=true;
        return todo.id!=id;
    })
    if(!found)
    return res.status(404).json({result:"item not found"})
    else
    return res.status(201).json({success:true})

})
router.post('/edit/:id',(req,res,next)=>{
    const body=req.body as requestBody;
    const params=req.params as requestParams;
    const id=params.id;
    let found:boolean=false;
    todos.forEach(todo=>{
        if(todo.id==id){
            todo.text=body.text;
            found=true;
        }
        
    })
    if(!found)
    return res.status(404).json({result:"item not found"})
    else
    return res.json({success:true})

})

export default router;