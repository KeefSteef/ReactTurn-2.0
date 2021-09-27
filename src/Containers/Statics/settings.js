export function settingsGenerateLine(arr) {

    let newArr = [0]
    let index = 0

    if (arr) {
        arr.forEach(el => {
            if (el.result === 'Good') {
                index++;
                newArr.push(index)
            } else {
                index--;
                newArr.push(index)
            }
        })
    }


    let set = {
        series: [{
            name: 'Total % of result',
            data: newArr
        }],
        options: {
            chart: {
                height: 50,
                type: 'solid'
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            },

            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },

    }

    return set

}


