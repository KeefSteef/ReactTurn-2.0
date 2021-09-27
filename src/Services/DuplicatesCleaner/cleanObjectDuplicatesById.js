export const cleanObjectDuplicatesById = (arr) => {
    const ids = arr.map(o => o.id);
    const filtered = arr.filter(({id}, index) => !ids.includes(id, index + 1));


    return [...filtered].sort((a,b) => a.id - b.id); //Sort objcts by id in array

}