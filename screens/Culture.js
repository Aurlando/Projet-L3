import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const cultureContent = [
  { type: 'title', text: "L’art culinaire Malagasy et le repas Malagasy" },
  { type: 'section', text: 'Introduction' },
  { type: 'paragraph', text: "La cuisine Malagasy est le reflet de la diversité culturelle et géographique de Madagascar. Elle est influencée par les traditions africaines, asiatiques et européennes, et repose principalement sur des produits locaux comme le riz, les légumes, les tubercules, la viande, le poisson et les épices." },
  { type: 'section', text: 'Les bases de l’alimentation Malagasy' },
  { type: 'subtitle', text: '1. Le riz, aliment central' },
  { type: 'paragraph', text: "Le riz, appelé vary, est l'aliment de base incontournable. Il est consommé à chaque repas, souvent trois fois par jour. Il peut être accompagné de sauces ou de la viande, et est parfois préparé sous forme de bouillie (sosoa)." },
  { type: 'subtitle', text: '2. Les accompagnements ("laoka")' },
  { type: 'paragraph', text: "Les laoka sont les plats qui accompagnent le riz. Ils peuvent être composés de :" },
  { type: 'list', items: [
    'Viandes : zébu (bœuf), poulet, porc.',
    'Poissons et crustacés, surtout dans les régions côtières.',
    'Légumes : brèdes (feuilles comestibles), haricots, tomates, etc.',
    'Légumineuses : pois du cap, lentilles.',
    'Fruits à pain ou songe (manioc, patate douce, etc.).'
  ]},
  { type: 'section', text: 'Spécialités culinaires Malagasy' },
  { type: 'dish', name: 'Ravitoto', desc: "Feuilles de manioc pilées, généralement cuites avec de la viande de porc. Très apprécié pour son goût unique." },
  { type: 'image', src: require('../assets/ravitoto.png'), alt: 'Ravitoto' },
  { type: 'dish', name: "Hen’omby ritra", desc: "Viande de zébu mijotée dans une sauce réduite, parfois avec des tomates et des oignons." },
  { type: 'image', src: require('../assets/henombyritra.png'), alt: "Hen'omby ritra" },
  { type: 'dish', name: 'Akoho sy voanio', desc: "Poulet au lait de coco, typique des régions côtières." },
  { type: 'image', src: require('../assets/akoho.png'), alt: 'Akoho sy voanio' },
  { type: 'dish', name: 'Mofo anana et mofo gasy', desc: "Beignets de légumes et galettes sucrées au riz, vendus souvent dans la rue comme en-cas ou au petit déjeuner." },
  { type: 'section', text: 'Boissons traditionnelles' },
  { type: 'list', items: [
    'Ranovola : eau de riz brûlé, boisson populaire au goût fumé.',
  ]},
  { type: 'image', src: require('../assets/ranovola.png'), alt: 'Ranovola' },
  { type: 'list', items: [
    'Betsa-betsa : boisson alcoolisée artisanale à base de jus de canne fermenté.'
  ]},
  { type: 'list', items: [
    'Rhum arrangé : rhum parfumé avec des fruits, des épices ou des herbes.'
  ]},
  { type: 'image', src: require('../assets/rhumarrange.png'), alt: 'Rhum arrangé' },
  { type: 'section', text: 'Repas typique d’une journée' },
  { type: 'table', rows: [
    ['Moment', 'Repas'],
    ['Matin', 'Mofo gasy, sosoa, café'],
    ['Midi', 'Vary + laoka (viande/légumes) + ranovola'],
    ['Soir', 'Riz léger, soupe ou restes du midi']
  ]},
  { type: 'section', text: 'Conclusion' },
  { type: 'paragraph', text: "L’art culinaire Malagasy est simple mais riche en saveurs. Il reflète l’importance des produits locaux, la convivialité et la culture du partage dans la société Malagasy. Découvrir la cuisine Malagasy, c’est aussi explorer l’âme du peuple Malagasy à travers ses plats traditionnels." }
];

const Culture = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#222';
  const sectionColor = theme === 'dark' ? '#6CA94F' : '#4CAF50';
  const bgColor = theme === 'dark' ? '#000' : '#fff';

  const renderContent = () =>
    cultureContent.map((item, idx) => {
      switch (item.type) {
        case 'title':
          return <Text key={idx} style={[styles.title, { color: sectionColor }]}>{item.text}</Text>;
        case 'section':
          return <Text key={idx} style={[styles.section, { color: sectionColor }]}>{item.text}</Text>;
        case 'subtitle':
          return <Text key={idx} style={[styles.subtitle, { color: textColor }]}>{item.text}</Text>;
        case 'paragraph':
          return <Text key={idx} style={[styles.paragraph, { color: textColor }]}>{item.text}</Text>;
        case 'list':
          return (
            <View key={idx} style={styles.list}>
              {item.items.map((li, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={[styles.bullet, { color: sectionColor }]}>•</Text>
                  <Text style={[styles.listText, { color: textColor }]}>{li}</Text>
                </View>
              ))}
            </View>
          );
        case 'dish':
          return (
            <View key={idx} style={styles.dishBlock}>
              <Text style={[styles.dishName, { color: sectionColor }]}>{item.name}</Text>
              <Text style={[styles.dishDesc, { color: textColor }]}>{item.desc}</Text>
            </View>
          );
        case 'image':
          return (
            <View key={idx} style={styles.imageBlock}>
              <Image source={item.src} style={styles.cultureImage} resizeMode="cover" />
              {item.alt && <Text style={styles.imageCaption}>{item.alt}</Text>}
            </View>
          );
        case 'table':
          return (
            <View key={idx} style={styles.table}>
              {item.rows.map((row, i) => (
                <View key={i} style={[styles.tableRow, i === 0 && styles.tableHeaderRow]}>
                  <Text style={[styles.tableCell, i === 0 && styles.tableHeaderCell, { color: textColor }]}>{row[0]}</Text>
                  <Text style={[styles.tableCell, i === 0 && styles.tableHeaderCell, { color: textColor }]}>{row[1]}</Text>
                </View>
              ))}
            </View>
          );
        default:
          return null;
      }
    });

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}> 
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 18, textAlign: 'center' },
  section: { fontSize: 20, fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 4 },
  paragraph: { fontSize: 15, lineHeight: 24, marginBottom: 10 },
  list: { marginBottom: 10, marginLeft: 10 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  bullet: { fontSize: 18, marginRight: 8, marginTop: -2 },
  listText: { fontSize: 15, flex: 1 },
  dishBlock: { marginBottom: 14, marginLeft: 10 },
  dishName: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  dishDesc: { fontSize: 15, marginBottom: 2 },
  imageBlock: { alignItems: 'center', marginVertical: 18 },
  cultureImage: { width: 220, height: 140, borderRadius: 16, marginBottom: 6, borderWidth: 1, borderColor: '#eee' },
  imageCaption: { fontSize: 13, color: '#888', fontStyle: 'italic', marginBottom: 2 },
  table: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginVertical: 12, overflow: 'hidden' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tableHeaderRow: { backgroundColor: '#f2f2f2' },
  tableCell: { flex: 1, padding: 8, fontSize: 15 },
  tableHeaderCell: { fontWeight: 'bold' },
});

export default Culture; 