/**
 * Unformatted data for the schwundfaktor-Entwicklungs calculation
 */
class SchwundfaktorFormat {
    course: string;
    years: number[];
    faktor: number[];

    /**
     * Creates a new instance of the unformatted schwundfaktor data
     * @param {string} course - Course name.
     * @param {number[]} years - Number of years (Must be of same length as faktor)
     * @param {number[]} faktor - Calculated schwundfaktoren for the years (Must be of same length as years)
     */
    constructor(course: string, years: number[], faktor: number[]) {
        // years are the labels for the faktors, so both have to be of same length!
        if (years.length !== faktor.length) {
          throw new Error('Length of faktor and years must be equal! ' + faktor.length + '!=' + years.length );
        }
    
        this.course = course;
        this.years = years;
        this.faktor = faktor;
    }
}

export default SchwundfaktorFormat;