/**
 * Dictionary containing frequently asked questions and their corresponding information. Entries have the following structure:
 * - name: The name of the FAQ entry; it also serves as headline
 * - short: A short description of the FAQ entry; it is displayed in the FAQ overview or via Tooltips
 * - long: A more detailed explanation of the FAQ entry; it is displayed when the FAQ entry is opened
 * - link: A link to a source with more detailed or thorough information on the FAQ entry
 * 
 * In general, every entry should have all three fields (name, short, long) filled out. link is optional.
 *  
 * If an entrys short text is self-explanatory enough, the long text can be omitted (aka an empty string). 
 * The corresponding field on the FAQ site will only then use the short text as a replacement for the long text.
 * 
 * If the link field contains a string, the FAQ entry will have a link to the given source at the end of the long text (no validation of the link happens!).
 */
const FAQDictionary = {
    dataIncomplete: {
        name:   'Unvollständige Daten',
        short:  'Mind. 1 ausgewählter Studiengang hat unzureichende Daten',
        long:   'Bei der Auswahl der Daten hat mindestens ein Studiengang nicht genug Datensätze für alle angezeigten Jahre.',
        link:   '',
    },
    academicYear: {
        name:   'Akademisches Jahr',
        short:  'Zusammenfassung der Studierenden eines Jahrgangs aus WiSe und SoSe (auch "Kohorte" genannt)',
        long:   'Das akademische Jahr (bzw. Kohorte) fasst die Studierenden eines Jahrgangs zusammen, die in einem Semester und dem darauffolgendem eingeschrieben sind. Dabei startet ein akademisches Jahr i.d.R. im Wintersemester.',
        link:   '',
    },
    shrinkageFactor: {
        name:   'Schwundfaktor',
        short:  'Faktor der Studierenden eines Studiengangs, die ihr Studium nicht abschließen. Werte > 1 signalisieren einen Schwund der Studierenden',
        long:   'Der berechnete Schwundfaktor gibt an, wie viele Studierende eines Studiengangs ihr Studium nicht abschließen. Werte > 1 (Idealwert) signalisieren dabei einen Schwund der Studierenden.',
        //example link to our source from aulis
        link:   'https://aulis.hs-bremen.de/goto.php?target=file_2059055_download&client_id=hsbremen',
    },
    shrinkageFactorIdeal: {
        name:   'Idealwert',
        short:  'Der Idealwert des Schwundfaktors. Hierbei tritt kein Schwund der Studierenden auf',
        long:   'Der Idealwert des Schwundfaktors von 1 ist ein Referenzwert, der keinen Schwund der Studierenden angibt. In der Realität ist der Schwundfaktor jedoch meist größer als 1 und es werden individuelle, von der Hochschule festgelegte Zielwerte für die Studiengänge angestrebt.',
        link:   '',
    },
    meanTransitionRate: {
        name:   'Mittlere Übergangsquote',
        short:  'Gemittelte Übergangsquote der drei Kohorten für eine Jahresberechnung des Schwundfaktors',
        long:   'Die mittlere Übergangsquote gibt in der Schwundberechnung an, wie viele Prozent der Studierenden eines Studiengangs in einer Berechnung von einem Semester in das nächste Semester übergehen. Dabei werden die einzelnen Übergangsquoten der drei Kohorten gemittelt.',
        link:   '',
    },
    shrinkageFactorComparisonChart: {
        name:   'Diagramm: Schwundfaktorentwicklung Vergleich',
        short:  'Diagramm zur Gegenüberstellung der Schwundfaktoren versch. Studiengänge über die Jahre hinweg',
        long:   'Das Diagramm zeigt die Entwicklung des Schwundfaktors verschiedener Studiengänge über die Jahre hinweg.',
        link:   'https://aulis.hs-bremen.de/goto.php?target=file_2059055_download&client_id=hsbremen',
    },
    shrinkageFactorDevelopmentChart: {
        name:   'Diagramm: Schwundfaktorentwicklung',
        short:  'Diagramm zur Entwicklung des Schwundfaktors eines Studiengangs über die Jahre hinweg',
        long:   'Das Diagramm zeigt die Entwicklung des Schwundfaktors eines Studiengangs über die Jahre hinweg.',
        link:   'https://aulis.hs-bremen.de/goto.php?target=file_2059055_download&client_id=hsbremen',
    },
    shrinkageFactorStudentsChart: {
        name:   'Diagramm: Schwundfaktorberechnung v. Studiengang in einem Jahr',
        short:  'Diagramm zur Anzeige der zugrundeliegenden Daten der Schwundfaktorberechnung eines Studiengangs für ein Jahr',
        long:   'Das Diagramm zeigt die zugrundeliegenden Daten der Schwundfaktorberechnung eines Studiengangs für ein Jahr, sowie die mittlere Übergangsquote. Dabei werden immer drei - in Regelstudienzeit bereits abgeschlossene - akademische Jahrgänge betrachtet. Beispielsweise: Bei einer Regelstudienzeit von 8 Semestern und für das Jahr 2020 wären dies die Jahrgänge 2015, 2016 und 2017.',
        link:   'https://aulis.hs-bremen.de/goto.php?target=file_2059055_download&client_id=hsbremen',
    },
    courseOfStudyChart: {
        name:   'Diagramm: Studienverlauf',
        short:  'Diagramm zur Anzeige des Studienverlaufs eines akademischen Jahrgangs eines Studiengangs über die Semester hinweg',
        long:   'Das Diagramm zeigt den Studienverlauf eines akademischen Jahrgangs eines Studiengangs über die Semester hinweg. Dabei wird die Anzahl der Studierenden und der Abbrecher und Fachwechsler in den einzelnen Semestern dargestellt.',
        link:   '',
    },
}

export default FAQDictionary;