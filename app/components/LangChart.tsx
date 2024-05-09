'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { LanguageDataset } from '@/app/utils/models';
import { useAppTheme } from '@/app/context/AppTheme';


ChartJS.register(ArcElement, Tooltip, Legend);

const LangChart = ({ languages }: { languages: Languages }) => {

    const data = prepareDataset(languages)
    const {monsterRat} = useAppTheme()

    return (
        <div className='ml-0 lg:ml-8'>
            <h3 style={monsterRat.style} className='text-center mb-6 font-semibold lg:text-lg text-slate-800 dark:text-slate-300'>Used Languages</h3>
            <Doughnut data={data} options={{ responsive: true, plugins: { legend: { display: true, position: "bottom" } } }} />
        </div>
    )
}

type Languages = { [key: string]: { count: number, color: string } }

function prepareDataset(data: { [key: string]: { count: number, color: string } }): LanguageDataset {
    const labels: string[] = Object.keys(data);
    const values: number[] = []
    const colors: string[] = []

    labels.forEach((curr) => {
        values.push(data[curr].count);
        colors.push(data[curr].color)
    })

    return {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }
        ]
    }
}


export default LangChart