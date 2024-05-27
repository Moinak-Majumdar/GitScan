'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { LanguageDataset } from '@/app/utils/models';
import { useAppTheme } from '@/app/context/AppTheme';


ChartJS.register(ArcElement, Tooltip);

const LangChart = ({ languages }: { languages: Languages }) => {

    const data = prepareDataset(languages)
    const colors: string[] = data.datasets[0].backgroundColor as string[];
    const { monsterRat, inter } = useAppTheme()

    return (
        <div className='ml-0 lg:ml-8'>
            <h3 style={monsterRat.style} className='text-center mb-6 font-semibold lg:text-lg text-slate-800 dark:text-slate-300'>Used Languages</h3>
            <div className='w-full flex justify-center items-center flex-col'>
                <Doughnut className='h-20' data={data} options={{ responsive: true }} />
                <div className='grid grid-cols-2 mt-4 w-48 mx-auto'>
                    {data.labels?.map((curr, i) => {
                        return (
                            <div key={`language-${i}`} className='flex justify-start items-center'>
                                <span className='w-2 h-2 rounded-full' style={{ backgroundColor: colors[i] }}></span>
                                <span style={inter.style} className='ml-2 text-xs text-slate-700 dark:text-slate-400'>{curr}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

type Languages = { [key: string]: { count: number, color: string } }

function prepareDataset(data: { [key: string]: { count: number, color: string } }): LanguageDataset {
    let labels: string[] = Object.keys(data);
    const sortable = []

    for (let i = 0; i < labels.length; i++) {
        sortable.push([labels[i], data[labels[i]].color, data[labels[i]].count])
    }
    sortable.sort((a: any, b: any) => b[2] - a[2])

    labels = []
    const colors: string[] = []
    const values: number[] = []

    sortable.forEach((elm) => {
        labels.push(elm[0] as string)
        colors.push(elm[1] as string)
        values.push(elm[2] as number)
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