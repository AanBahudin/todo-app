import { toast } from "react-toastify"
import { redirect, useOutletContext, Form } from "react-router-dom"
import { List } from "../components"
import axios from "axios"

export const action = async({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await axios.post('/api/v1/todo', data)
        toast.success('Task added')
        return redirect('.')
    } catch (error) {
        toast.error(error.response.data.msg)
        return error
    }
}


const Todo = () => {

    const {jobData} = useOutletContext()

    return (
        <div className="w-[100vw] min-h-[100vh] bg-[#030C0E]">
            
            <section className="w-[80%] h-[100vh] mx-auto flex items-center justify-center flex-col">

                <h1 className="text-[#BDBEBC] text-4xl font-medium">Todo List</h1>

                <Form method="POST" className="mt-8 w-[50%] py-2 px-7  rounded-2xl mx-auto text-[#BDBEBC] bg-[#1C2E34] flex justify-between items-center">
                    <input className="w-[90%] bg-transparent outline-none border-none py-2" type="text" name="todo" id="todo" placeholder="add your text" />
                    <p>add</p>
                </Form>

                <div className="w-[50%] my-8">
                    {jobData.todo.map(item => {
                        return <List {...item} key={item.id} />
                    })}
                </div>

            </section>
        </div>
        )
}

export default Todo