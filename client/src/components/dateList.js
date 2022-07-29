import React from 'react'

export default function DateList(props) {
  return (
    <ul className="flex">
        <li className="mr-3">
        <button className="inline-block rounded py-1 px-3 bg-indigo-500 text-white" value="all" onClick={props.onClick}>All</button>
        </li>
        <li className="mr-3">
        <button className="inline-block rounded py-1 px-3 bg-indigo-500 text-white" value="week" onClick={props.onClick}>Week Ago</button>
        </li>
        <li className="mr-3">
        <button className="inline-block rounded py-1 px-3 bg-indigo-500 text-white" value="month" onClick={props.onClick}>Month Ago</button>
        </li>
    </ul>
  )
}