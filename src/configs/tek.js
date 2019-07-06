const TB = [
    "CEV 234E",
    "KIM 210E",
    "TEK 354E"
];
const TM = [
    "MAK 331E",
    "TEK 466E",
];
const ITB = ["ALM 101","ALM 102","ALM 201","ALM 202","ALM 301","ALM 302","ALM 401","CIN 101","CIN 102","CIN 201","FRA 101","FRA 102","FRA 201","FRA 202","FRA 301","FRA 302","HUK 211","HUK 212","HUK 213","HUK 214","ING 103A","ING 103AC","ING 103AD","ING 103B","ING 103C","ING 103ES","ING 103G","ING 103H","ING 103I","ING 103L","ING 103N","ING 103O","ING 103P","ING 103SC","ISL 465E","ISL 478E","ISP 101","ISP 102","ISP 201","ISP 202","ISP 301","ISP 302","ITA 101","ITA 102","ITA 201","ITA 202","ITB 020E","ITB 037E","ITB 087E","ITB 094E","ITB 095E","ITB 143E","ITB 151E","ITB 171E","ITB 179E","ITB 201E","ITB 202E","ITB 203E","ITB 204E","ITB 205E","ITB 206E","ITB 207E","ITB 208E","ITB 209E","ITB 213E","ITB 215E","ITB 216E","ITB 217E","ITB 218E","ITB 219E","ITB 220E","ITB 221E","ITB 222E","ITB 224E","ITB 227E","ITB 228E","ITB 230E","ITB 233E","ITB 234E","JPN 101","JPN 102","JPN 201","JPN 202","RUS 101","RUS 102","RUS 201","TEK 483E","TEK 485E"];
const MT_1 = ["TEK 417E","TEK 441E","TEK 447E","TEK 451E","TEK 452E","TEK 453E","TEK 456E","TEK 457E","TEK 459E"];
const MT_2 = ["TEK 417E","TEK 441E","TEK 447E","TEK 451E","TEK 452E","TEK 453E","TEK 456E","TEK 457E","TEK 459E"];
const SNT = ["SNT 102E","SNT 103E","SNT 104E","SNT 105E","SNT 106E","SNT 107E","SNT 112E","SNT 113E","SNT 114E","SNT 116E","SNT 117E","SNT 121E","SNT 123E","SNT 211E","SNT 212E","SNT 215E","SNT 226E","SNT 227E"];
const MT_3 = ["TEK 412E","TEK 414E","TEK 416E","TEK 418E","TEK 419E","TEK 422E","TEK 424E","TEK 426E","TEK 434E","TEK 458E","TEK 478E"];
const MT_4 = ["TEK 412E","TEK 414E","TEK 416E","TEK 418E","TEK 419E","TEK 422E","TEK 424E","TEK 426E","TEK 434E","TEK 458E","TEK 478E"];
const ITB_2 = ["ALM 101","ALM 102","ALM 201","ALM 202","ALM 301","ALM 302","ALM 401","CIN 101","CIN 102","CIN 201","FRA 101","FRA 102","FRA 201","FRA 202","FRA 301","FRA 302","HUK 213","HUK 214","ING 103A","ING 103AC","ING 103AD","ING 103B","ING 103C","ING 103ES","ING 103G","ING 103H","ING 103I","ING 103L","ING 103N","ING 103O","ING 103P","ING 103SC","ISL 465E","ISP 101","ISP 102","ISP 201","ISP 202","ISP 301","ISP 302","ITA 101","ITA 102","ITA 201","ITA 202","ITB 020E","ITB 037E","ITB 087E","ITB 094E","ITB 095E","ITB 143E","ITB 151E","ITB 171E","ITB 179E","ITB 201E","ITB 202E","ITB 203E","ITB 204E","ITB 205E","ITB 206E","ITB 207E","ITB 208E","ITB 209E","ITB 213E","ITB 215E","ITB 216E","ITB 217E","ITB 218E","ITB 219E","ITB 220E","ITB 221E","ITB 222E","ITB 224E","ITB 227E","ITB 228E","ITB 230E","JPN 101","JPN 102","JPN 201","JPN 202","RUS 101","RUS 102","RUS 201"];

export const coursesTEK = [
    [
        "KIM 101E",
        "KIM 101EL",
        "BIL 100E",
        "MAT 103E",
        "FIZ 101E",
        "RES 103E",
        "FIZ 101EL",
        "TEK 111E",
        "DAN 101"
    ],
    [
        "TEK 114E",
        "KIM 205E",
        "MAT 104E",
        "FIZ 102E",
        "FIZ 102EL",
        "BIL 113E",
        "ING 112"
    ],
    [
        "MEK 205E",
        "ING 201",
        "MAL 201E",
        "MAT 210E",
        "TEK 213E",
        "TEK 233E",
        "ETK 101E"
    ],
    [
        "MUK 207E",
        "TEK 234E",
        "MAT 271E",
        "MAT 202E",
        "TEK 254E",
        "TUR 101",
        {course: "", options: TB}
    ],
    [
        "TER 201E",
        "TEK 345E",
        "TEK 327E",
        "TEK 361E",
        "TEK 305E",
        "EKO 201E",
        "TUR 102"
    ],
    [
        "TEK 308E",
        "TEK 392E",
        "TEK 316E",
        "AKM 204E",
        "ELK 221E",
        "TEK 352E",
        "DAN 301",
        {course: "", options: TM}
    ],
    [
        "ATA 101",
        "TEK 413E",
        "TEK 455E",
        "TEK 4901E",
        {course: "", options: ITB},
        {course: "", options: MT_1},
        {course: "", options: MT_2},
    ],
    [
        "ATA 102",
        "TEK 4902E",
        {course: "", options: SNT},
        {course: "", options: MT_3},
        {course: "", options: MT_4},
        {course: "", options: ITB_2}
    ]
];