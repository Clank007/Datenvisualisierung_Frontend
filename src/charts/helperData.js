import SchwundfaktorFormat from "./helperTypes";

export const schwundfaktorDaten = [
    new SchwundfaktorFormat( "ATMECH B.Eng.", [2020, 2021, 2022, 2023, 2024], [ 1.2780, 1.3910, 1.3622, 1.3365, 1.3411 ]),
    new SchwundfaktorFormat( "ATMEI", [2020, 2021, 2022, 2023, 2024], [ null, null, 1.3622, 1.3365, 1.3411]),
    new SchwundfaktorFormat( "ATM D", [2020, 2021, 2022, 2023, 2024], [ null, null, null, null, 1.1392]),
    new SchwundfaktorFormat( "ISS", [2020, 2021, 2022, 2023, 2024], [ 1.5200, 1.5200, 1.4963, 1.5228, 1.5488]),
    new SchwundfaktorFormat( "IT", [2020, 2021, 2022, 2023, 2024], [ 1.6129, 1.6862, 1.6073, 1.6304, 1.6919]),
    new SchwundfaktorFormat( "ISTI", [2020, 2021, 2022, 2023, 2024], [ 2.0258, 2.0040, 1.8808, 1.7050, 2.0035]),
    new SchwundfaktorFormat( "DSI", [2020, 2021, 2022, 2023, 2024], [ 1.2347, 1.2298, 1.1758, 1.1827, 1.1409]),
    //gibts anscheinend nicht mehr im BE
    new SchwundfaktorFormat( "IFI B.Sc./IFI-dual B.Sc. (gemittelt/gewichtet)", [2020, 2021, 2022, 2023, 2024], [ 1.5500, 1.5698, 1.5519, 1.4880, 1.4940]),
    new SchwundfaktorFormat( "IFI", [2020, 2021, 2022, 2023, 2024], [ 1.8283, 1.7431, 1.7192, 1.6341, 1.6118]),
    new SchwundfaktorFormat( "IFIdual", [2020, 2021, 2022, 2023, 2024], [ 1.1000, 1.0500, 1.0500, 1.0495, 1.0759]),
    new SchwundfaktorFormat( "ISMI", [2020, 2021, 2022, 2023, 2024], [ 1.2691, 1.3697, 1.3311, 1.3369, 1.4181]),
    new SchwundfaktorFormat( "ET", [2020, 2021, 2022, 2023, 2024], [ 1.4887, 1.3836, 1.3187, 1.3193, 1.2803]),
    new SchwundfaktorFormat( "ISTAP", [2020, 2021, 2022, 2023, 2024], [ 1.5329, 1.5374, 1.5088, 1.4674, 1.5309]),
    new SchwundfaktorFormat( "KSS", [2020, 2021, 2022, 2023, 2024], [ 1.1087, 1.1508, 1.0931, 1.0246, 1.0479]),
    new SchwundfaktorFormat( "EE", [2020, 2021, 2022, 2023, 2024], [ 1.0743, 1.0548, 1.0146, 1.0865, 1.0681]),
    //gibts anscheinend nicht mehr im BE
    new SchwundfaktorFormat( "EMSS M.Sc.", [2020, 2021, 2022, 2023, 2024], [ null, null, null, 1.1150, 1.1150]),
];

export const StudierendenVerlauf2020 = [
    {
        course: "DSI",
        semesters: ["1. FS", "2. FS", "3. FS", "4. FS", "5. FS", "6. FS", "7. FS", "8. FS"],
        meanSuccess: [1.0000, 0.9667, 0.9554, 0.9558, 0.8784, 1.0000, 0.9524, 1.0037],
        kohorten: [
            { 
                kohorte: "2015",
                netStudents: [10, 9, 9, 9, 7, 7, 6, 6],
                WiSe: [10, 9, 9, 9, 7, 7, 6, 6],
                SoSe: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                kohorte: "2016",
                netStudents: [21, 21, 19, 18, 17, 17, 17, 18],
                WiSe: [21, 21, 19, 18, 17, 17, 17, 18],
                SoSe: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                kohorte: "2017",
                netStudents: [26, 26, 25, 23, 21, 21, 21, 20],
                WiSe: [26, 26, 25, 23, 21, 21, 21, 20],
                SoSe: [0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
    },
];