import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

export default function Graph() {
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative"></div>

        <div className="flex flex-col py-10 gap-4">
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400"></span>
          </h3>
        </div>
      </div>
    </div>
  );
}
