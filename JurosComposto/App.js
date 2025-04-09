import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

export default function App() {
  const [valorInicial, setValorInicial] = useState('1000');
  const [valorMensal, setValorMensal] = useState('0');
  const [taxaJuros, setTaxaJuros] = useState('5');
  const [tipoTaxa, setTipoTaxa] = useState('anual');
  const [periodo, setPeriodo] = useState('120');
  const [tipoPeriodo, setTipoPeriodo] = useState('meses');

  const formatarMoeda = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const calcularJuros = () => {
    const principal = parseFloat(valorInicial) || 0;
    const aporteMensal = parseFloat(valorMensal) || 0;
    const taxa = parseFloat(taxaJuros) || 0;
    let periodoMeses = parseInt(periodo) || 0;
   
    if (tipoPeriodo === 'anos') {
      periodoMeses = periodoMeses * 12;
    }
   
    let taxaMensal;
    if (tipoTaxa === 'anual') {
      taxaMensal = Math.pow(1 + taxa / 100, 1/12) - 1;
    } else {
      taxaMensal = taxa / 100;
    }
   
    let montante = principal;
   
    for (let i = 0; i < periodoMeses; i++) {
      montante = montante * (1 + taxaMensal) + aporteMensal;
    }
   
    const totalInvestido = principal + (aporteMensal * periodoMeses);
    const totalJuros = montante - totalInvestido;
   
    return {
      valorFinal: montante,
      totalInvestido: totalInvestido,
      totalJuros: totalJuros
    };
  };

  const resultado = calcularJuros();

  const toggleTipoTaxa = () => {
    setTipoTaxa(tipoTaxa === 'anual' ? 'mensal' : 'anual');
  };

  const toggleTipoPeriodo = () => {
    setTipoPeriodo(tipoPeriodo === 'meses' ? 'anos' : 'meses');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Meu cálculo</Text>
             
              <View style={styles.inputGroup}>
                <Text style={styles.label}>- Valor inicial</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={valorInicial}
                  onChangeText={setValorInicial}
                />
              </View>
             
              <View style={styles.inputGroup}>
                <Text style={styles.label}>- Valor mensal</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={valorMensal}
                  onChangeText={setValorMensal}
                />
              </View>
             
              <View style={styles.inputGroup}>
                <Text style={styles.label}>- Taxa de juros</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    keyboardType="numeric"
                    value={taxaJuros}
                    onChangeText={setTaxaJuros}
                  />
                  <TouchableOpacity onPress={toggleTipoTaxa} style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>% ({tipoTaxa})</Text>
                  </TouchableOpacity>
                </View>
              </View>
             
              <View style={styles.inputGroup}>
                <Text style={styles.label}>- Período em</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    keyboardType="numeric"
                    value={periodo}
                    onChangeText={setPeriodo}
                  />
                  <TouchableOpacity onPress={toggleTipoPeriodo} style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>{tipoPeriodo}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
           
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Resultado</Text>
             
              <View style={styles.resultGroup}>
                <Text style={styles.label}>- Valor total final</Text>
                <Text style={styles.resultValue}>{formatarMoeda(resultado.valorFinal)}</Text>
              </View>
             
              <View style={styles.resultGroup}>
                <Text style={styles.label}>- Valor total investido</Text>
                <Text style={styles.resultValue}>{formatarMoeda(resultado.totalInvestido)}</Text>
              </View>
             
              <View style={styles.resultGroup}>
                <Text style={styles.label}>- Total em juros</Text>
                <Text style={styles.resultValueRed}>{formatarMoeda(resultado.totalJuros)}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#0D0106',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#6F6F6F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fbfbff',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fbfbff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fbfbff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#3e92cc',
    borderRadius: 6,
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  resultGroup: {
    marginBottom: 12,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1b998b',
    marginTop: 3,
  },
  resultValueRed: { 
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff101f',
    marginTop: 3,
  },
});