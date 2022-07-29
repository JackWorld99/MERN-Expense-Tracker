import React from 'react'
import { useForm } from 'react-hook-form';
import List from './List'
import {default as api} from '../store/apiSlice'

export default function Form() {
    const {register, handleSubmit, resetField} = useForm();
    const [addTransaction] = api.useAddTransactionMutation();

    const onSubmit = async(data) => {
        if(!data) return {};
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('amount');
        window.location.reload();
    }

  return (
    <div className="form max-w-sm mx-auto w-96">
        <h1 className='font-bold pb-4 text-xl'>Transaction Record</h1>
        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="input-group">
                    <input type="text" {...register('name')} placeholder='Salary, House Rent...' className='form-input' required/>
                </div>
                <select className='form-input' {...register('type')}>
                    <option value="Expense" defaultValue>Expense</option>
                    <option value="Savings">Savings</option>
                    <option value="Investment">Investment</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Charity">Charity</option>
                </select>
                <div className="input-group">
                    <input type="number" {...register('amount')} placeholder='Amount' className='form-input' required/>
                </div>
                <div className="submit-btn">
                    <button className='py-2 text-white bg-indigo-500 w-full rounded'>Record</button>
                </div>
            </div>    
        </form>
        <List></List>
    </div>
  )
}
