import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// Assuming you have a logo image in your public folder or accessible via URL
// import logo from './logo.png'; // If local, make sure bundler handles it or use URL

// Register a font if you need specific ones (optional)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf' });

const styles = StyleSheet.create({
  page: {
    padding: 72,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.4,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    textAlign: 'center'
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    backgroundColor: '#f2f2f2',
    padding: 5,
  },
  tableCol: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableColSmall: {
    width: "23.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  listItem: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  listItemNumber: {
    marginRight: 5,
  },
  listItemText: {
    flex: 1,
  },
  dateText: {
    marginLeft: 20,
  },
  centeredText: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  underline: {
    textDecoration: 'underline',
  },
  classOption: {
    marginHorizontal: 5,
  },
  classOptionCircled: {
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 3,
  },
  fillInBlank: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingHorizontal: 5,
    minWidth: 100,
  },
  nameInBlank: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingHorizontal: 5,
    minWidth: 100,
    textDecoration: 'underline',
    backgroundColor: 'yellow',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: 'grey',
    fontSize: 9,
  }
});

const MyDocument = ({
  clientData,
  selectedClass,
}) => {
  const classes = ["Parenting", "Substance Use and Responsible Living", "Working with Anger"];

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Image style={styles.logo} src="/path-to-your-logo.png" />
        <Text style={styles.header}>Level One Signature Paperwork</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}><Text style={styles.subHeader}>Class you are Taking (circle the appropriate class):</Text></View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          {classes.map(cls => (
            <Text key={cls} style={cls === selectedClass ? styles.classOptionCircled : styles.classOption}>
              {cls}{classes.indexOf(cls) < classes.length - 1 ? ' / ' : ''}
            </Text>
          ))}
        </View>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 15, marginBottom: 8, textAlign: 'center' }}>Basic Info</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Client Name (Alias&apos;s):</Text>
            <Text style={styles.tableCol}>{clientData.name}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Current Address:</Text>
            <Text style={styles.tableCol}>{clientData.address}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>City:</Text>
            <Text style={styles.tableColSmall}>{clientData.city}</Text>
            <Text style={styles.tableColHeader}>State:</Text>
            <Text style={styles.tableColSmall}>{clientData.state}</Text>
            <Text style={styles.tableColHeader}>Zip:</Text>
            <Text style={styles.tableColSmall}>{clientData.zip}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Telephone Number:</Text>
            <Text style={styles.tableCol}>{clientData.phone}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>E-mail:</Text>
            <Text style={styles.tableCol}>{clientData.email}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Emergency contact (cannot be victim):</Text>
            <Text style={styles.tableCol}>{clientData.emergencyContact}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Agent/Caseworker/referral source:</Text>
            <Text style={styles.tableCol}>{clientData.agentCaseworker}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Are you safe in your current living environment?</Text>
            <Text style={styles.tableCol}>{clientData.isSafe}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Is your current living environment helpful for your successful completion of this program, please explain:</Text>
            <Text style={styles.tableCol}>{clientData.environmentHelpful}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 15, textAlign: 'center' }}>General Standards for</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>Educational Classes</Text>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}>All individual and group sessions must be attended, and participants are to arrive on time. If you are late you will not be allowed to receive credit for that session. While in attendance clients will actively participate, be in a room alone with no other people present, and be viewable on camera at all times during class.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}>A total of two (2) absences are allowed in substance abuse level one.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}>There is a No-Tolerance policy in regard to violence, weapons, or re-offense; demonstration of each will result in immediate dismissal from the session and potentially the program.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>4.</Text><Text style={styles.listItemText}>Participants agree to participate and pay for a minimum of 2 random Drug and Alcohol Screens.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>5.</Text><Text style={styles.listItemText}>Use of any mood-altering drug (including alcohol) is prohibited throughout the duration of the assigned program with exception to those prescribed medication for a physical condition in which another, non-mood altering drug, cannot be substituted. Justification for this exception will require written consent to exchange information with the prescribing physician.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>6.</Text><Text style={styles.listItemText}>Any participant that tests positive for drugs or alcohol will be immediately referred to Substance Abuse Treatment at the level deemed appropriate by Three Trees Staff.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>7.</Text><Text style={styles.listItemText}>Participant must agree to sign required contracts, and to assist in developing personal treatment plan when appropriate.</Text></View>
        <Text style={styles.sectionTitle}>Group Confidentiality Agreement</Text>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}>I, <Text style={styles.nameInBlank}>{clientData.name}</Text>, (Client&apos;s name) promise to hold confidential all communications made by participants and all information obtained from or about any participant while receiving treatment in this program.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}>I am making this promise in consideration of the mutual promises made by all participants in this group and in return for benefits available from group therapy/education.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}>I understand the purpose of this agreement is to help assure that each member of the group will feel more comfortable revealing personal information about themselves, enabling the therapists/facilitators to obtain as much information as possible necessary for effective treatment.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>4.</Text><Text style={styles.listItemText}>Please sign this form and keep a copy for yourself for future reference. Should you have any questions at any time, please ask.</Text></View>
        <Text style={styles.sectionTitle}>Fee and Payment Policies</Text>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}>Three Trees only accepts secured payments; therefore, fees may be paid by cash or money order, or online at www.threetreescenterforchange.com.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}>The cost of enrollment at the time of intake is $40.00 for all applicants to the program.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}>The cost for each group session is $25.00 per class.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>4.</Text><Text style={styles.listItemText}>You will have a minimum of 2 drug and alcohol screens that will cost $25 each. These will be paid at time of drug screen.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>5.</Text><Text style={styles.listItemText}>Group fees are to be paid at the time service is provided. If unable to pay the entire group fee, the participant will not receive credit for that session. If a participant wishes to attend and participate in a group session without receiving credit, he/she is welcome to do so.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>6.</Text><Text style={styles.listItemText}>Program clients are held responsible for any outstanding balances even after they are no longer participating in the program.</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>7.</Text><Text style={styles.listItemText}>Any change in financial responsibilities should be noted here:<Text style={styles.fillInBlank}>____________________</Text></Text></View>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 15, textAlign: 'center' }}>Statement of Client Rights</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>As a client of Three Trees Center For Change, LLC, you will be afforded:</Text>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}>Respect and dignity for and protection of your privacy</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}>Your informed consent to participate in services</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}><Text style={styles.boldText}>CONFIDENTIALITY</Text> of your client records, unless contraindicated in treatment and recovery process or as ordered by an appropriate healthcare provider</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>4.</Text><Text style={styles.listItemText}>Privacy of sessions, unless contraindicated in treatment and recovery process or as ordered by an appropriate healthcare provider</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>5.</Text><Text style={styles.listItemText}>A thorough explanation of program treatment, rules, and expectations</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>6.</Text><Text style={styles.listItemText}>The opportunity to provide feedback and recommendations throughout treatment regarding program rules, expectations, and quality of care</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>7.</Text><Text style={styles.listItemText}>All rights and privileges regarding civil rights pursuant to Title VII, Section 601 of the Civil Rights Act of 1964, the Americans with Disabilities Act.</Text></View>
        <Text style={{ marginTop: 20 }}>I have reviewed and understand the general rules, fee and payment policies, confidentiality agreement and my rights:</Text>
        <Text style={{ marginTop: 10 }}>Client Signature<Text style={styles.fillInBlank}>_________________________</Text> Date: <Text style={styles.fillInBlank}>_________________________</Text></Text>
        <Text style={styles.sectionTitle}>Authorization for Release of Information</Text>
        <Text>I, <Text style={styles.nameInBlank}>{clientData.name}</Text> (client&apos;s name) authorize Three Trees Center for Change, LLC to exchange the below specified information with anyone who is involved in the court mandated monitoring of my treatment. To include, but not limited to, the Department of Social Services, Probation and Parole, Victim Advocates, Pre-Trial Intervention, County Solicitor&apos;s Office, or Court employees, and my own legal counsel.</Text>
        <Text style={{ marginTop: 10 }}>I further authorize Three Trees Center for Change, LLC to exchange information with the following additional individuals/groups:</Text>
        <Text>1. <Text style={styles.fillInBlank}>__________________________________________________</Text></Text>
        <Text>2. <Text style={styles.fillInBlank}>__________________________________________________</Text></Text>
        <Text>3. <Text style={styles.fillInBlank}>__________________________________________________</Text></Text>
        <Text>4. <Text style={styles.fillInBlank}>__________________________________________________</Text></Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4, marginTop: 15 }}>The following information will be shared:</Text>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}>Re-offenses of violence towards anyone</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}>Violations of court orders</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}>Missed appointments and compliance with other program rules</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>4.</Text><Text style={styles.listItemText}>Treatment progress</Text></View>
        <View style={styles.listItem}><Text style={styles.listItemNumber}>5.</Text><Text style={styles.listItemText}>Information relevant to safety, assessment and treatment planning</Text></View>
        <Text style={{ marginTop: 10 }}>My birth date is: <Text style={styles.fillInBlank}>__________________________________________________</Text></Text>
        <Text style={{ marginTop: 10 }}>This authorization will expire 180 days from my completion or termination of this program, except for allowing Three Trees Center for Change to follow up at 1, 3, and 5 year intervals to see if I have recidivated. I also understand that this authorization may be revoked by me, in writing, at any time, except to the extent that action has already been taken.</Text>
        <Text style={{ marginTop: 10 }}>I have reviewed and provide permission for my information to be released to the above-mentioned parties.</Text>
        <Text style={{ marginTop: 10 }}>Client Signature<Text style={styles.fillInBlank}>_________________________</Text> Date: <Text style={styles.fillInBlank}>_________________________</Text></Text>
        <Text style={{ marginTop: 10 }}>Staff Signature<Text style={styles.fillInBlank}>_________________________</Text> Date: <Text style={styles.fillInBlank}>_________________________</Text></Text>
        <Text style={styles.footer}>Three Trees Center for Change, LLC</Text>
      </Page>
    </Document>
  )
};

export default MyDocument;