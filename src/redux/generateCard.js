export function generateCardInfo(nameList, startTime) {
    const timeList = [5000,3000,7000];
    const pointList = ['Passport Review', 'Practice', 'INN Create']
    const randomName = nameList[Math.floor(Math.random() * nameList.length)]
    const randomTime = timeList[Math.floor(Math.random() * timeList.length)]
    return {
        startTime,
        name: randomName,
        time: randomTime,
        point: pointList[Math.floor(Math.random() * pointList.length)]
    }
}
