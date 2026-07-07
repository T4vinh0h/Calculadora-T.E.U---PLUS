// Calculadora T.E.U - PLUS - Script Principal

// Estrutura de categorias e subcategorias
const categories = {
    math: {
        name: 'Matemática',
        icon: 'fa-calculator',
        subcategories: {
            basic: 'Operações Básicas',
            algebra: 'Álgebra',
            advanced: 'Avançado'
        }
    },
    geometry: {
        name: 'Geometria',
        icon: 'fa-shapes',
        subcategories: {
            plane: 'Geometria Plana',
            spatial: 'Geometria Espacial'
        }
    },
    converters: {
        name: 'Conversores',
        icon: 'fa-exchange-alt',
        subcategories: {
            basic: 'Medidas Fundamentais',
            electricity: 'Eletricidade',
            technology: 'Tecnologia',
            optics: 'Óptica',
            physics: 'Física',
            chemistry: 'Química',
            engineering: 'Engenharia',
            utilities: 'Utilidades'
        }
    },
    finance: {
        name: 'Finanças',
        icon: 'fa-dollar-sign',
        subcategories: {
            currency: 'Moedas',
            loans: 'Empréstimos',
            tax: 'Impostos e Gorjetas'
        }
    },
    health: {
        name: 'Saúde',
        icon: 'fa-heart',
        subcategories: {
            bmi: 'IMC',
            bodyFat: 'Gordura Corporal',
            calories: 'Calorias'
        }
    },
    datetime: {
        name: 'Data/Hora',
        icon: 'fa-calendar',
        subcategories: {
            age: 'Idade',
            dateCalc: 'Cálculos de Data',
            interval: 'Intervalo'
        }
    },
    transport: {
        name: 'Transporte',
        icon: 'fa-car',
        subcategories: {
            mileage: 'Quilometragem',
            fuel: 'Combustível'
        }
    },
    electrical: {
        name: 'Elétrica',
        icon: 'fa-bolt',
        subcategories: {
            ohm: 'Lei de Ohm'
        }
    }
};

// Estado atual
let currentCategory = 'math';
let currentSubcategory = 'basic';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupCategoryNavigation();
    renderSubcategoryButtons();
    renderCalculator();
});

// Configuração da navegação de categorias
function setupCategoryNavigation() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            currentSubcategory = Object.keys(categories[currentCategory].subcategories)[0];
            renderSubcategoryButtons();
            renderCalculator();
        });
    });
}

// Renderizar botões de subcategoria
function renderSubcategoryButtons() {
    const container = document.getElementById('subcategoryButtons');
    const subcategories = categories[currentCategory].subcategories;
    
    container.innerHTML = Object.entries(subcategories).map(([key, name]) => `
        <button class="subcategory-btn px-3 py-1 rounded-full text-sm ${currentSubcategory === key ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-purple-500 hover:text-white transition-all" data-subcategory="${key}">
            ${name}
        </button>
    `).join('');

    // Adicionar event listeners
    container.querySelectorAll('.subcategory-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.subcategory-btn').forEach(b => {
                b.classList.remove('bg-purple-600', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            btn.classList.remove('bg-gray-200', 'text-gray-700');
            btn.classList.add('bg-purple-600', 'text-white');
            currentSubcategory = btn.dataset.subcategory;
            renderCalculator();
        });
    });
}

// Renderizar calculadora baseada na categoria e subcategoria
function renderCalculator() {
    const container = document.getElementById('calculatorContent');
    
    switch(currentCategory) {
        case 'math':
            renderMathCalculator(container);
            break;
        case 'geometry':
            renderGeometryCalculator(container);
            break;
        case 'converters':
            renderConverterCalculator(container);
            break;
        case 'finance':
            renderFinanceCalculator(container);
            break;
        case 'health':
            renderHealthCalculator(container);
            break;
        case 'datetime':
            renderDateTimeCalculator(container);
            break;
        case 'transport':
            renderTransportCalculator(container);
            break;
        case 'electrical':
            renderElectricalCalculator(container);
            break;
    }
}

// ==================== MATEMÁTICA ====================
function renderMathCalculator(container) {
    switch(currentSubcategory) {
        case 'basic':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-plus-circle mr-2"></i>Operações Básicas</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Número 1</label>
                        <input type="number" id="num1" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Digite o primeiro número">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Número 2</label>
                        <input type="number" id="num2" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Digite o segundo número">
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                    <button onclick="calculateBasic('+')" class="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"><i class="fas fa-plus"></i> Somar</button>
                    <button onclick="calculateBasic('-')" class="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"><i class="fas fa-minus"></i> Subtrair</button>
                    <button onclick="calculateBasic('*')" class="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"><i class="fas fa-times"></i> Multiplicar</button>
                    <button onclick="calculateBasic('/')" class="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"><i class="fas fa-divide"></i> Dividir</button>
                    <button onclick="calculatePercentage()" class="bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"><i class="fas fa-percent"></i> Porcentagem</button>
                </div>
                <div id="basicResult" class="mt-4 p-4 rounded-lg result-box hidden">
                    <p class="text-lg font-semibold">Resultado: <span id="basicResultValue"></span></p>
                </div>
            `;
            break;
        case 'algebra':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-square-root-alt mr-2"></i>Álgebra</h2>
                <div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Média</h3>
                        <input type="text" id="meanNumbers" class="w-full px-4 py-2 border rounded-lg" placeholder="Digite números separados por vírgula (ex: 10, 20, 30)">
                        <button onclick="calculateMean()" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Calcular Média</button>
                        <p id="meanResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Razão e Proporção</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="ratioA" class="px-4 py-2 border rounded-lg" placeholder="A">
                            <input type="number" id="ratioB" class="px-4 py-2 border rounded-lg" placeholder="B">
                            <input type="number" id="ratioC" class="px-4 py-2 border rounded-lg" placeholder="C">
                            <input type="number" id="ratioD" class="px-4 py-2 border rounded-lg" placeholder="D (?)">
                        </div>
                        <button onclick="calculateRatio()" class="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Calcular</button>
                        <p id="ratioResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Equação do 2º Grau (ax² + bx + c = 0)</h3>
                        <div class="grid grid-cols-3 gap-2">
                            <input type="number" id="quadA" class="px-4 py-2 border rounded-lg" placeholder="a">
                            <input type="number" id="quadB" class="px-4 py-2 border rounded-lg" placeholder="b">
                            <input type="number" id="quadC" class="px-4 py-2 border rounded-lg" placeholder="c">
                        </div>
                        <button onclick="solveQuadratic()" class="mt-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">Resolver</button>
                        <p id="quadResult" class="mt-2 font-semibold"></p>
                    </div>
                </div>
            `;
            break;
        case 'advanced':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-cogs mr-2"></i>Avançado</h2>
                <div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">MDC e MMC</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="mdcNum1" class="px-4 py-2 border rounded-lg" placeholder="Número 1">
                            <input type="number" id="mdcNum2" class="px-4 py-2 border rounded-lg" placeholder="Número 2">
                        </div>
                        <div class="flex gap-2 mt-2">
                            <button onclick="calculateMDC()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">MDC</button>
                            <button onclick="calculateMMC()" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">MMC</button>
                        </div>
                        <p id="mdcResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Combinações (nCr)</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="combN" class="px-4 py-2 border rounded-lg" placeholder="n (total)">
                            <input type="number" id="combR" class="px-4 py-2 border rounded-lg" placeholder="r (escolher)">
                        </div>
                        <button onclick="calculateCombination()" class="mt-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">Calcular</button>
                        <p id="combResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Verificador de Números Primos</h3>
                        <input type="number" id="primeNum" class="w-full px-4 py-2 border rounded-lg" placeholder="Digite um número">
                        <button onclick="checkPrime()" class="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">Verificar</button>
                        <p id="primeResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Gerador de Números Aleatórios</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="randMin" class="px-4 py-2 border rounded-lg" placeholder="Mínimo" value="1">
                            <input type="number" id="randMax" class="px-4 py-2 border rounded-lg" placeholder="Máximo" value="100">
                        </div>
                        <button onclick="generateRandom()" class="mt-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">Gerar</button>
                        <p id="randResult" class="mt-2 font-semibold"></p>
                    </div>
                </div>
            `;
            break;
    }
}

// Funções matemáticas básicas
function calculateBasic(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    let result;
    
    if (isNaN(num1) || isNaN(num2)) {
        alert('Por favor, digite números válidos');
        return;
    }
    
    switch(operation) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': 
            if (num2 === 0) {
                alert('Não é possível dividir por zero');
                return;
            }
            result = num1 / num2; 
            break;
    }
    
    document.getElementById('basicResult').classList.remove('hidden');
    document.getElementById('basicResultValue').textContent = result.toFixed(4).replace(/\.?0+$/, '');
}

function calculatePercentage() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        alert('Por favor, digite números válidos');
        return;
    }
    
    const result = (num1 * num2) / 100;
    document.getElementById('basicResult').classList.remove('hidden');
    document.getElementById('basicResultValue').textContent = `${num2}% de ${num1} = ${result.toFixed(4).replace(/\.?0+$/, '')}`;
}

function calculateMean() {
    const input = document.getElementById('meanNumbers').value;
    const numbers = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numbers.length === 0) {
        alert('Por favor, digite números válidos separados por vírgula');
        return;
    }
    
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    document.getElementById('meanResult').textContent = `Média: ${mean.toFixed(4).replace(/\.?0+$/, '')}`;
}

function calculateRatio() {
    const a = parseFloat(document.getElementById('ratioA').value);
    const b = parseFloat(document.getElementById('ratioB').value);
    const c = parseFloat(document.getElementById('ratioC').value);
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || b === 0) {
        alert('Por favor, digite números válidos (B não pode ser zero)');
        return;
    }
    
    const d = (c * b) / a;
    document.getElementById('ratioResult').textContent = `D = ${d.toFixed(4).replace(/\.?0+$/, '')} (Proporção: ${a}:${b} = ${c}:${d.toFixed(2)})`;
}

function solveQuadratic() {
    const a = parseFloat(document.getElementById('quadA').value);
    const b = parseFloat(document.getElementById('quadB').value);
    const c = parseFloat(document.getElementById('quadC').value);
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
        alert('Por favor, digite números válidos (A não pode ser zero)');
        return;
    }
    
    const delta = b * b - 4 * a * c;
    
    if (delta < 0) {
        document.getElementById('quadResult').textContent = 'Não há raízes reais (Δ < 0)';
    } else if (delta === 0) {
        const x = -b / (2 * a);
        document.getElementById('quadResult').textContent = `Raiz única: x = ${x.toFixed(4).replace(/\.?0+$/, '')}`;
    } else {
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        document.getElementById('quadResult').textContent = `x₁ = ${x1.toFixed(4).replace(/\.?0+$/, '')}, x₂ = ${x2.toFixed(4).replace(/\.?0+$/, '')}`;
    }
}

function calculateMDC() {
    const a = parseInt(document.getElementById('mdcNum1').value);
    const b = parseInt(document.getElementById('mdcNum2').value);
    
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        alert('Por favor, digite números inteiros positivos');
        return;
    }
    
    let x = a, y = b;
    while (y) {
        [x, y] = [y, x % y];
    }
    document.getElementById('mdcResult').textContent = `MDC(${a}, ${b}) = ${x}`;
}

function calculateMMC() {
    const a = parseInt(document.getElementById('mdcNum1').value);
    const b = parseInt(document.getElementById('mdcNum2').value);
    
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        alert('Por favor, digite números inteiros positivos');
        return;
    }
    
    let x = a, y = b;
    while (y) {
        [x, y] = [y, x % y];
    }
    const mdc = x;
    const mmc = (a * b) / mdc;
    document.getElementById('mdcResult').textContent = `MMC(${a}, ${b}) = ${mmc}`;
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

function calculateCombination() {
    const n = parseInt(document.getElementById('combN').value);
    const r = parseInt(document.getElementById('combR').value);
    
    if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) {
        alert('Por favor, digite números válidos (0 ≤ r ≤ n)');
        return;
    }
    
    const result = factorial(n) / (factorial(r) * factorial(n - r));
    document.getElementById('combResult').textContent = `C(${n}, ${r}) = ${result}`;
}

function checkPrime() {
    const num = parseInt(document.getElementById('primeNum').value);
    
    if (isNaN(num) || num < 2) {
        alert('Por favor, digite um número inteiro maior que 1');
        return;
    }
    
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }
    
    document.getElementById('primeResult').textContent = isPrime ? `${num} é primo` : `${num} não é primo`;
}

function generateRandom() {
    const min = parseInt(document.getElementById('randMin').value);
    const max = parseInt(document.getElementById('randMax').value);
    
    if (isNaN(min) || isNaN(max) || min >= max) {
        alert('Por favor, digite números válidos (mínimo < máximo)');
        return;
    }
    
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('randResult').textContent = `Número aleatório: ${result}`;
}

// ==================== GEOMETRIA ====================
function renderGeometryCalculator(container) {
    switch(currentSubcategory) {
        case 'plane':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-shapes mr-2"></i>Geometria Plana</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Quadrado</h3>
                        <input type="number" id="squareSide" class="w-full px-4 py-2 border rounded-lg" placeholder="Lado">
                        <button onclick="calculateSquare()" class="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Calcular</button>
                        <p id="squareResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Retângulo</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="rectWidth" class="px-4 py-2 border rounded-lg" placeholder="Base">
                            <input type="number" id="rectHeight" class="px-4 py-2 border rounded-lg" placeholder="Altura">
                        </div>
                        <button onclick="calculateRectangle()" class="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Calcular</button>
                        <p id="rectResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Triângulo</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="triBase" class="px-4 py-2 border rounded-lg" placeholder="Base">
                            <input type="number" id="triHeight" class="px-4 py-2 border rounded-lg" placeholder="Altura">
                        </div>
                        <button onclick="calculateTriangle()" class="mt-2 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">Calcular</button>
                        <p id="triResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Círculo</h3>
                        <input type="number" id="circleRadius" class="w-full px-4 py-2 border rounded-lg" placeholder="Raio">
                        <button onclick="calculateCircle()" class="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">Calcular</button>
                        <p id="circleResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Trapézio</h3>
                        <div class="grid grid-cols-3 gap-2">
                            <input type="number" id="trapBase1" class="px-4 py-2 border rounded-lg" placeholder="Base 1">
                            <input type="number" id="trapBase2" class="px-4 py-2 border rounded-lg" placeholder="Base 2">
                            <input type="number" id="trapHeight" class="px-4 py-2 border rounded-lg" placeholder="Altura">
                        </div>
                        <button onclick="calculateTrapezoid()" class="mt-2 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">Calcular</button>
                        <p id="trapResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Losango</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="rhombusD1" class="px-4 py-2 border rounded-lg" placeholder="Diagonal 1">
                            <input type="number" id="rhombusD2" class="px-4 py-2 border rounded-lg" placeholder="Diagonal 2">
                        </div>
                        <button onclick="calculateRhombus()" class="mt-2 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600">Calcular</button>
                        <p id="rhombusResult" class="mt-2 font-semibold"></p>
                    </div>
                </div>
            `;
            break;
        case 'spatial':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-cube mr-2"></i>Geometria Espacial</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Cubo</h3>
                        <input type="number" id="cubeSide" class="w-full px-4 py-2 border rounded-lg" placeholder="Aresta">
                        <button onclick="calculateCube()" class="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Calcular</button>
                        <p id="cubeResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Paralelepípedo</h3>
                        <div class="grid grid-cols-3 gap-2">
                            <input type="number" id="paraA" class="px-4 py-2 border rounded-lg" placeholder="Aresta A">
                            <input type="number" id="paraB" class="px-4 py-2 border rounded-lg" placeholder="Aresta B">
                            <input type="number" id="paraC" class="px-4 py-2 border rounded-lg" placeholder="Aresta C">
                        </div>
                        <button onclick="calculateParallelepiped()" class="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Calcular</button>
                        <p id="paraResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Esfera</h3>
                        <input type="number" id="sphereRadius" class="w-full px-4 py-2 border rounded-lg" placeholder="Raio">
                        <button onclick="calculateSphere()" class="mt-2 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">Calcular</button>
                        <p id="sphereResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Cilindro</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="cylRadius" class="px-4 py-2 border rounded-lg" placeholder="Raio">
                            <input type="number" id="cylHeight" class="px-4 py-2 border rounded-lg" placeholder="Altura">
                        </div>
                        <button onclick="calculateCylinder()" class="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">Calcular</button>
                        <p id="cylResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Cone</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="coneRadius" class="px-4 py-2 border rounded-lg" placeholder="Raio">
                            <input type="number" id="coneHeight" class="px-4 py-2 border rounded-lg" placeholder="Altura">
                        </div>
                        <button onclick="calculateCone()" class="mt-2 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">Calcular</button>
                        <p id="coneResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Pirâmide (Base Quadrada)</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="pyramidBase" class="px-4 py-2 border rounded-lg" placeholder="Lado da base">
                            <input type="number" id="pyramidHeight" class="px-4 py-2 border rounded-lg" placeholder="Altura">
                        </div>
                        <button onclick="calculatePyramid()" class="mt-2 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600">Calcular</button>
                        <p id="pyramidResult" class="mt-2 font-semibold"></p>
                    </div>
                </div>
            `;
            break;
    }
}

// Funções de geometria plana
function calculateSquare() {
    const side = parseFloat(document.getElementById('squareSide').value);
    if (isNaN(side) || side <= 0) {
        alert('Por favor, digite um valor positivo');
        return;
    }
    const area = side * side;
    const perimeter = 4 * side;
    document.getElementById('squareResult').innerHTML = `Área: ${area.toFixed(4)}<br>Perímetro: ${perimeter.toFixed(4)}`;
}

function calculateRectangle() {
    const width = parseFloat(document.getElementById('rectWidth').value);
    const height = parseFloat(document.getElementById('rectHeight').value);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        alert('Por favor, digite valores positivos');
        return;
    }
    const area = width * height;
    const perimeter = 2 * (width + height);
    document.getElementById('rectResult').innerHTML = `Área: ${area.toFixed(4)}<br>Perímetro: ${perimeter.toFixed(4)}`;
}

function calculateTriangle() {
    const base = parseFloat(document.getElementById('triBase').value);
    const height = parseFloat(document.getElementById('triHeight').value);
    if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
        alert('Por favor, digite valores positivos');
        return;
    }
    const area = (base * height) / 2;
    document.getElementById('triResult').textContent = `Área: ${area.toFixed(4)}`;
}

function calculateCircle() {
    const radius = parseFloat(document.getElementById('circleRadius').value);
    if (isNaN(radius) || radius <= 0) {
        alert('Por favor, digite um valor positivo');
        return;
    }
    const area = Math.PI * radius * radius;
    const circumference = 2 * Math.PI * radius;
    document.getElementById('circleResult').innerHTML = `Área: ${area.toFixed(4)}<br>Circunferência: ${circumference.toFixed(4)}`;
}

function calculateTrapezoid() {
    const base1 = parseFloat(document.getElementById('trapBase1').value);
    const base2 = parseFloat(document.getElementById('trapBase2').value);
    const height = parseFloat(document.getElementById('trapHeight').value);
    if (isNaN(base1) || isNaN(base2) || isNaN(height) || base1 <= 0 || base2 <= 0 || height <= 0) {
        alert('Por favor, digite valores positivos');
        return;
    }
    const area = ((base1 + base2) * height) / 2;
    document.getElementById('trapResult').textContent = `Área: ${area.toFixed(4)}`;
}

function calculateRhombus() {
    const d1 = parseFloat(document.getElementById('rhombusD1').value);
    const d2 = parseFloat(document.getElementById('rhombusD2').value);
    if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) {
        alert('Por favor, digite valores positivos');
        return;
    }
    const area = (d1 * d2) / 2;
    document.getElementById('rhombusResult').textContent = `Área: ${area.toFixed(4)}`;
}

// Funções de geometria espacial
function calculateCube() {
    const side = parseFloat(document.getElementById('cubeSide').value);
    if (isNaN(side) || side <= 0) {
        alert('Por favor, digite um valor positivo');
        return;
    }
    const volume = side * side * side;
    const area = 6 * side * side;
    document.getElementById('cubeResult').innerHTML = `Volume: ${volume.toFixed(4)}<br>Área superficial: ${area.toFixed(4)}`;
}

function calculateParallelepiped() {
    const a = parseFloat(document.getElementById('paraA').value);
    const b = parseFloat(document.getElementById('paraB').value);
    const c = parseFloat(document.getElementById('paraC').value);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        alert('Por favor, digite valores positivos');
        return;
    }
    const volume = a * b * c;
    const area = 2 * (a * b + a * c + b * c);
    document.getElementById('paraResult').innerHTML = `Volume: ${volume.toFixed(4)}<br>Área superficial: ${area.toFixed(4)}`;
}

function calculateSphere() {
    const radius = parseFloat(document.getElementById('sphereRadius').value);
    if (isNaN(radius) || radius <= 0) {
        alert('Por favor, digite um valor positivo');
        return;
    }
    const volume = (4/3) * Math.PI * radius * radius * radius;
    const area = 4 * Math.PI * radius * radius;
    document.getElementById('sphereResult').innerHTML = `Volume: ${volume.toFixed(4)}<br>Área superficial: ${area.toFixed(4)}`;
}

function calculateCylinder() {
    const radius = parseFloat(document.getElementById('cylRadius').value);
    const height = parseFloat(document.getElementById('cylHeight').value);
    if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0) {
        alert('Por favor, digite valores positivos');
        return;
    }
    const volume = Math.PI * radius * radius * height;
    const area = 2 * Math.PI * radius * (radius + height);
    document.getElementById('cylResult').innerHTML = `Volume: ${volume.toFixed(4)}<br>Área superficial: ${area.toFixed(4)}`;
}

function calculateCone() {
    const radius = parseFloat(document.getElementById('coneRadius').value);
    const height = parseFloat(document.getElementById('coneHeight').value);
    if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0) {
        alert('Por favor, digite valores positivos');
        return;
    }
    const volume = (Math.PI * radius * radius * height) / 3;
    const slantHeight = Math.sqrt(radius * radius + height * height);
    const area = Math.PI * radius * (radius + slantHeight);
    document.getElementById('coneResult').innerHTML = `Volume: ${volume.toFixed(4)}<br>Área superficial: ${area.toFixed(4)}`;
}

function calculatePyramid() {
    const base = parseFloat(document.getElementById('pyramidBase').value);
    const height = parseFloat(document.getElementById('pyramidHeight').value);
    if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
        alert('Por favor, digite valores positivos');
        return;
    }
    const volume = (base * base * height) / 3;
    const slantHeight = Math.sqrt((base/2) * (base/2) + height * height);
    const area = base * base + 2 * base * slantHeight;
    document.getElementById('pyramidResult').innerHTML = `Volume: ${volume.toFixed(4)}<br>Área superficial: ${area.toFixed(4)}`;
}

// ==================== CONVERSORES ====================
const conversionRates = {
    // Medidas Fundamentais
    length: {
        units: ['Metros', 'Quilômetros', 'Centímetros', 'Milímetros', 'Milhas', 'Jardas', 'Pés', 'Polegadas'],
        toBase: [1, 1000, 0.01, 0.001, 1609.344, 0.9144, 0.3048, 0.0254]
    },
    area: {
        units: ['Metros²', 'Quilômetros²', 'Hectares', 'Acres', 'Pés²'],
        toBase: [1, 1000000, 10000, 4046.86, 0.092903]
    },
    volume: {
        units: ['Metros³', 'Litros', 'Mililitros', 'Galões (US)', 'Pés³'],
        toBase: [1, 0.001, 0.000001, 0.00378541, 0.0283168]
    },
    weight: {
        units: ['Quilogramas', 'Gramas', 'Miligramas', 'Toneladas', 'Libras', 'Onças'],
        toBase: [1, 0.001, 0.000001, 1000, 0.453592, 0.0283495]
    },
    time: {
        units: ['Segundos', 'Minutos', 'Horas', 'Dias', 'Semanas', 'Meses', 'Anos'],
        toBase: [1, 60, 3600, 86400, 604800, 2592000, 31536000]
    },
    temperature: {
        units: ['Celsius', 'Fahrenheit', 'Kelvin'],
        special: true
    },
    speed: {
        units: ['m/s', 'km/h', 'mph', 'kn (nós)', 'ft/s'],
        toBase: [1, 0.277778, 0.44704, 0.514444, 0.3048]
    },
    acceleration: {
        units: ['m/s²', 'km/h²', 'ft/s²', 'g (9.81 m/s²)'],
        toBase: [1, 0.00007716, 0.3048, 9.81]
    },
    force: {
        units: ['Newtons', 'Dinas', 'kgf', 'lbf'],
        toBase: [1, 0.00001, 9.80665, 4.44822]
    },
    energy: {
        units: ['Joules', 'Calorias', 'kWh', 'BTU', 'eV'],
        toBase: [1, 4.184, 3600000, 1055.06, 1.60218e-19]
    },
    power: {
        units: ['Watts', 'kW', 'HP', 'BTU/h'],
        toBase: [1, 1000, 745.7, 0.293071]
    },
    pressure: {
        units: ['Pascal', 'kPa', 'bar', 'atm', 'psi', 'mmHg'],
        toBase: [1, 1000, 100000, 101325, 6894.76, 133.322]
    },
    torque: {
        units: ['N·m', 'lbf·ft', 'kgf·m'],
        toBase: [1, 1.35582, 9.80665]
    },
    volumetricFlow: {
        units: ['m³/s', 'L/s', 'L/min', 'GPM (gal/min)'],
        toBase: [1, 0.001, 0.0000166667, 0.0000630902]
    },
    flow: {
        units: ['kg/s', 'g/s', 'lb/min'],
        toBase: [1, 0.001, 0.00755987]
    },
    density: {
        units: ['kg/m³', 'g/cm³', 'lb/ft³'],
        toBase: [1, 1000, 16.0185]
    },
    currentDensity: {
        units: ['A/m²', 'A/cm²', 'A/mm²'],
        toBase: [1, 10000, 1000000]
    },
    fluxDensity: {
        units: ['T (Tesla)', 'G (Gauss)', 'Wb/m²'],
        toBase: [1, 0.0001, 1]
    },
    gravity: {
        units: ['m/s²', 'ft/s²', 'g (padrão)'],
        toBase: [1, 0.3048, 9.80665]
    },
    // Eletricidade
    resistance: {
        units: ['Ohms (Ω)', 'kΩ', 'MΩ', 'mΩ'],
        toBase: [1, 1000, 1000000, 0.001]
    },
    conductance: {
        units: ['Siemens (S)', 'mS', 'µS'],
        toBase: [1, 0.001, 0.000001]
    },
    conductivity: {
        units: ['S/m', 'mS/cm', 'µS/cm'],
        toBase: [1, 0.1, 0.0001]
    },
    inductance: {
        units: ['Henry (H)', 'mH', 'µH'],
        toBase: [1, 0.001, 0.000001]
    },
    capacitance: {
        units: ['Farad (F)', 'µF', 'nF', 'pF'],
        toBase: [1, 0.000001, 0.000000001, 0.000000000001]
    },
    magneticField: {
        units: ['A/m', 'Oe'],
        toBase: [1, 79.5775]
    },
    permeability: {
        units: ['H/m', 'µH/m'],
        toBase: [1, 0.000001]
    },
    fieldForce: {
        units: ['N/C', 'V/m', 'kV/mm'],
        toBase: [1, 1, 1000000]
    },
    // Tecnologia
    storage: {
        units: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
        toBase: [1, 1024, 1048576, 1073741824, 1099511627776, 1125899906842624]
    },
    dataCapacity: {
        units: ['Bits', 'Bytes', 'KB', 'MB', 'GB'],
        toBase: [1, 8, 8192, 8388608, 8589934592]
    },
    dataTransfer: {
        units: ['bps', 'Kbps', 'Mbps', 'Gbps', 'KB/s', 'MB/s', 'GB/s'],
        toBase: [1, 1000, 1000000, 1000000000, 8000, 8000000, 8000000000]
    },
    bitrate: {
        units: ['bps', 'Kbps', 'Mbps', 'Gbps'],
        toBase: [1, 1000, 1000000, 1000000000]
    },
    resolution: {
        units: ['Pixels', 'MP', 'KP'],
        toBase: [1, 1000000, 1000]
    },
    numberBase: {
        units: ['Binário', 'Octal', 'Decimal', 'Hexadecimal'],
        special: true
    },
    // Óptica
    luminosity: {
        units: ['Candelas (cd)', 'millicandelas (mcd)'],
        toBase: [1, 0.001]
    },
    illumination: {
        units: ['Lux (lx)', 'fc (foot-candle)'],
        toBase: [1, 10.7639]
    },
    angle: {
        units: ['Graus', 'Radianos', 'Gradians', 'Revolutions'],
        toBase: [1, 57.2958, 0.9, 360]
    },
    angleOfView: {
        units: ['Graus', 'Radianos'],
        toBase: [1, 57.2958]
    },
    image: {
        units: ['Pixels', 'Inches', 'cm', 'mm'],
        toBase: [1, 96, 37.7953, 3.77953]
    },
    exposure: {
        units: ['Lux·segundo', 'cd·s/m²'],
        toBase: [1, 1]
    },
    // Física
    frequency: {
        units: ['Hz', 'kHz', 'MHz', 'GHz', 'THz'],
        toBase: [1, 1000, 1000000, 1000000000, 1000000000000]
    },
    sound: {
        units: ['dB', 'Bel', 'Nepers'],
        toBase: [1, 10, 8.68589]
    },
    radiation: {
        units: ['Becquerel (Bq)', 'Curie (Ci)', 'Rutherford (Rd)'],
        toBase: [1, 37000000000, 1000000]
    },
    surfaceTension: {
        units: ['N/m', 'dyn/cm', 'lbf/in'],
        toBase: [1, 0.001, 175.127]
    },
    viscosity: {
        units: ['Pa·s', 'P (Poise)', 'cP (centipoise)'],
        toBase: [1, 0.1, 0.001]
    },
    // Química
    concentration: {
        units: ['mol/L', 'mmol/L', 'µmol/L', 'ppm', 'ppb'],
        toBase: [1, 0.001, 0.000001, 0.000001, 0.000000001]
    },
    solution: {
        units: ['mol/kg', 'mmol/kg', 'µmol/kg'],
        toBase: [1, 0.001, 0.000001]
    },
    activity: {
        units: ['kat', 'U', 'µkat'],
        toBase: [1, 0.0166667, 0.000001]
    },
    enzymaticActivity: {
        units: ['U/L', 'µkat/L', 'nkat/L'],
        toBase: [1, 16.6667, 0.0166667]
    },
    catalyst: {
        units: ['U', 'nkat', 'pkat'],
        toBase: [1, 60, 0.06]
    },
    ferritin: {
        units: ['µg/L', 'ng/mL', 'pmol/L'],
        toBase: [1, 1, 2.247]
    },
    // Engenharia
    fuelEfficiency: {
        units: ['km/L', 'L/100km', 'mpg (US)', 'mpg (UK)'],
        special: true
    },
    // Utilidades
    shoeSize: {
        units: ['BR', 'US', 'UK', 'EU'],
        special: true
    },
    ringSize: {
        units: ['BR', 'US', 'UK', 'EU (mm)'],
        special: true
    },
    romanNumerals: {
        units: ['Decimal', 'Romano'],
        special: true
    },
    prefixes: {
        units: ['yotta', 'zetta', 'exa', 'peta', 'tera', 'giga', 'mega', 'kilo', 'hecto', 'deca', 'deci', 'centi', 'milli', 'micro', 'nano', 'pico', 'femto', 'atto', 'zepto', 'yocto'],
        toBase: [1e24, 1e21, 1e18, 1e15, 1e12, 1e9, 1e6, 1e3, 1e2, 1e1, 1e-1, 1e-2, 1e-3, 1e-6, 1e-9, 1e-12, 1e-15, 1e-18, 1e-21, 1e-24]
    },
    beverages: {
        units: ['ml', 'L', 'fl oz (US)', 'pt (US)', 'qt (US)', 'gal (US)'],
        toBase: [1, 1000, 29.5735, 473.176, 946.353, 3785.41]
    },
    cooking: {
        units: ['ml', 'L', 'colher de chá', 'colher de sopa', 'xícara'],
        toBase: [1, 1000, 5, 15, 240]
    }
};

function renderConverterCalculator(container) {
    const converterMap = {
        basic: ['length', 'area', 'volume', 'weight', 'time', 'temperature', 'speed', 'acceleration', 'force', 'energy', 'power', 'pressure', 'torque', 'volumetricFlow', 'flow', 'density', 'currentDensity', 'fluxDensity', 'gravity'],
        electricity: ['resistance', 'conductance', 'conductivity', 'inductance', 'capacitance', 'magneticField', 'permeability', 'fieldForce'],
        technology: ['storage', 'dataCapacity', 'dataTransfer', 'bitrate', 'resolution', 'numberBase'],
        optics: ['luminosity', 'illumination', 'angle', 'angleOfView', 'image', 'exposure'],
        physics: ['frequency', 'sound', 'radiation', 'surfaceTension', 'viscosity'],
        chemistry: ['concentration', 'solution', 'activity', 'enzymaticActivity', 'catalyst', 'ferritin'],
        engineering: ['fuelEfficiency'],
        utilities: ['shoeSize', 'ringSize', 'romanNumerals', 'prefixes', 'beverages', 'cooking']
    };

    const converters = converterMap[currentSubcategory];
    
    const converterOptions = converters.map(conv => {
        const data = conversionRates[conv];
        return `<option value="${conv}">${data.units[0]}</option>`;
    }).join('');

    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-exchange-alt mr-2"></i>Conversor de Unidades</h2>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Conversão</label>
                <select id="converterType" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" onchange="updateConverterUnits()">
                    ${converterOptions}
                </select>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                    <input type="number" id="converterValue" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Digite o valor">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">De</label>
                    <select id="converterFrom" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"></select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Para</label>
                    <select id="converterTo" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"></select>
                </div>
                <div class="flex items-end">
                    <button onclick="convert()" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                        <i class="fas fa-calculator mr-2"></i>Converter
                    </button>
                </div>
            </div>
            <div id="converterResult" class="p-4 rounded-lg result-box hidden">
                <p class="text-lg font-semibold">Resultado: <span id="converterResultValue"></span></p>
            </div>
        </div>
    `;

    updateConverterUnits();
}

function updateConverterUnits() {
    const type = document.getElementById('converterType').value;
    const data = conversionRates[type];
    
    const fromSelect = document.getElementById('converterFrom');
    const toSelect = document.getElementById('converterTo');
    
    const options = data.units.map((unit, index) => 
        `<option value="${index}">${unit}</option>`
    ).join('');
    
    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;
    toSelect.selectedIndex = 1;
}

function convert() {
    const type = document.getElementById('converterType').value;
    const value = parseFloat(document.getElementById('converterValue').value);
    const fromIndex = parseInt(document.getElementById('converterFrom').value);
    const toIndex = parseInt(document.getElementById('converterTo').value);
    
    if (isNaN(value)) {
        alert('Por favor, digite um valor válido');
        return;
    }
    
    const data = conversionRates[type];
    let result;
    
    if (data.special) {
        result = convertSpecial(type, value, fromIndex, toIndex);
    } else {
        const baseValue = value * data.toBase[fromIndex];
        result = baseValue / data.toBase[toIndex];
    }
    
    document.getElementById('converterResult').classList.remove('hidden');
    document.getElementById('converterResultValue').textContent = 
        `${value} ${data.units[fromIndex]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${data.units[toIndex]}`;
}

function convertSpecial(type, value, fromIndex, toIndex) {
    switch(type) {
        case 'temperature':
            return convertTemperature(value, fromIndex, toIndex);
        case 'numberBase':
            return convertNumberBase(value, fromIndex, toIndex);
        case 'fuelEfficiency':
            return convertFuelEfficiency(value, fromIndex, toIndex);
        case 'shoeSize':
            return convertShoeSize(value, fromIndex, toIndex);
        case 'ringSize':
            return convertRingSize(value, fromIndex, toIndex);
        case 'romanNumerals':
            return convertRomanNumerals(value, fromIndex, toIndex);
        default:
            return value;
    }
}

function convertTemperature(value, fromIndex, toIndex) {
    let celsius;
    
    // Converter para Celsius primeiro
    switch(fromIndex) {
        case 0: celsius = value; break; // Celsius
        case 1: celsius = (value - 32) * 5/9; break; // Fahrenheit
        case 2: celsius = value - 273.15; break; // Kelvin
    }
    
    // Converter de Celsius para destino
    switch(toIndex) {
        case 0: return celsius; // Celsius
        case 1: return celsius * 9/5 + 32; // Fahrenheit
        case 2: return celsius + 273.15; // Kelvin
    }
}

function convertNumberBase(value, fromIndex, toIndex) {
    if (fromIndex === 3) { // Hexadecimal para decimal
        return parseInt(value, 16);
    } else if (toIndex === 3) { // Decimal para hexadecimal
        return parseInt(value).toString(16).toUpperCase();
    } else if (fromIndex === 0) { // Binário para decimal
        return parseInt(value, 2);
    } else if (toIndex === 0) { // Decimal para binário
        return parseInt(value).toString(2);
    } else if (fromIndex === 1) { // Octal para decimal
        return parseInt(value, 8);
    } else if (toIndex === 1) { // Decimal para octal
        return parseInt(value).toString(8);
    }
    return value;
}

function convertFuelEfficiency(value, fromIndex, toIndex) {
    // Converter para km/L primeiro
    let kmL;
    switch(fromIndex) {
        case 0: kmL = value; break; // km/L
        case 1: kmL = 100 / value; break; // L/100km
        case 2: kmL = value * 1.60934 / 3.78541; break; // mpg US
        case 3: kmL = value * 1.60934 / 4.54609; break; // mpg UK
    }
    
    // Converter de km/L para destino
    switch(toIndex) {
        case 0: return kmL; // km/L
        case 1: return 100 / kmL; // L/100km
        case 2: return kmL * 3.78541 / 1.60934; // mpg US
        case 3: return kmL * 4.54609 / 1.60934; // mpg UK
    }
}

function convertShoeSize(value, fromIndex, toIndex) {
    // Fórmulas aproximadas de conversão
    const formulas = {
        0: (v) => v, // BR
        1: (v) => v === 0 ? 0 : v - 2, // US (homem)
        2: (v) => v === 0 ? 0 : v - 2.5, // UK
        3: (v) => v === 0 ? 0 : v * 1.5 + 2 // EU
    };
    
    // Converter para BR primeiro
    let br;
    if (fromIndex === 0) {
        br = value;
    } else {
        // Converter de volta para BR (aproximado)
        switch(fromIndex) {
            case 1: br = value + 2; break;
            case 2: br = value + 2.5; break;
            case 3: br = (value - 2) / 1.5; break;
        }
    }
    
    return formulas[toIndex](br);
}

function convertRingSize(value, fromIndex, toIndex) {
    // Tamanhos de anel (mm): BR=mm, US, UK, EU
    const sizeChart = {
        0: value, // BR (mm)
        1: (value - 12.5) / 0.83, // US (aproximado)
        2: (value - 12.5) / 0.83 - 1, // UK (aproximado)
        3: value // EU (mm)
    };
    
    // Converter para mm primeiro
    let mm;
    if (fromIndex === 0 || fromIndex === 3) {
        mm = value;
    } else {
        mm = value * 0.83 + 12.5;
    }
    
    if (toIndex === 0 || toIndex === 3) {
        return mm;
    } else if (toIndex === 1) {
        return (mm - 12.5) / 0.83;
    } else {
        return (mm - 12.5) / 0.83 - 1;
    }
}

function convertRomanNumerals(value, fromIndex, toIndex) {
    if (fromIndex === 0) { // Decimal para romano
        return toRoman(parseInt(value));
    } else { // Romano para decimal
        return fromRoman(value);
    }
}

function toRoman(num) {
    const roman = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let str = '';
    for (let i of Object.keys(roman)) {
        let q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }
    return str;
}

function fromRoman(str) {
    const roman = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        const current = roman[str[i]];
        const next = roman[str[i + 1]];
        if (next && current < next) {
            num += next - current;
            i++;
        } else {
            num += current;
        }
    }
    return num;
}

// ==================== FINANÇAS ====================
function renderFinanceCalculator(container) {
    switch(currentSubcategory) {
        case 'currency':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-dollar-sign mr-2"></i>Conversor de Moedas</h2>
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                            <input type="number" id="currencyValue" class="w-full px-4 py-2 border rounded-lg" placeholder="Digite o valor">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">De</label>
                            <select id="currencyFrom" class="w-full px-4 py-2 border rounded-lg">
                                <option value="BRL">BRL - Real Brasileiro</option>
                                <option value="USD">USD - Dólar Americano</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - Libra Esterlina</option>
                                <option value="JPY">JPY - Iene Japonês</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Para</label>
                            <select id="currencyTo" class="w-full px-4 py-2 border rounded-lg">
                                <option value="USD">USD - Dólar Americano</option>
                                <option value="BRL">BRL - Real Brasileiro</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - Libra Esterlina</option>
                                <option value="JPY">JPY - Iene Japonês</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Taxa de Câmbio (opcional)</label>
                            <input type="number" id="exchangeRate" class="w-full px-4 py-2 border rounded-lg" placeholder="Deixe em branco para taxa aproximada">
                        </div>
                    </div>
                    <button onclick="convertCurrency()" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Converter</button>
                    <div id="currencyResult" class="p-4 rounded-lg result-box hidden">
                        <p class="text-lg font-semibold"><span id="currencyResultValue"></span></p>
                        <p class="text-sm text-gray-600"><span id="currencyRateInfo"></span></p>
                    </div>
                </div>
            `;
            break;
        case 'loans':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-hand-holding-usd mr-2"></i>Calculadora de Empréstimo</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Valor do Empréstimo</label>
                        <input type="number" id="loanAmount" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 10000">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Taxa de Juros Anual (%)</label>
                        <input type="number" id="loanRate" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 12">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Prazo (meses)</label>
                        <input type="number" id="loanTerm" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 12">
                    </div>
                    <button onclick="calculateLoan()" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Calcular</button>
                    <div id="loanResult" class="p-4 rounded-lg result-box hidden">
                        <p class="font-semibold">Pagamento Mensal: <span id="monthlyPayment"></span></p>
                        <p class="font-semibold">Total Pago: <span id="totalPaid"></span></p>
                        <p class="font-semibold">Total de Juros: <span id="totalInterest"></span></p>
                    </div>
                </div>
            `;
            break;
        case 'tax':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-receipt mr-2"></i>Impostos e Gorjetas</h2>
                <div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Gorjeta</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="billAmount" class="px-4 py-2 border rounded-lg" placeholder="Valor da conta">
                            <input type="number" id="tipPercent" class="px-4 py-2 border rounded-lg" placeholder="Porcentagem %" value="10">
                        </div>
                        <button onclick="calculateTip()" class="mt-2 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">Calcular Gorjeta</button>
                        <p id="tipResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Imposto sobre Vendas</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="priceBeforeTax" class="px-4 py-2 border rounded-lg" placeholder="Preço sem imposto">
                            <input type="number" id="taxRate" class="px-4 py-2 border rounded-lg" placeholder="Taxa de imposto %" value="17">
                        </div>
                        <button onclick="calculateSalesTax()" class="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">Calcular Imposto</button>
                        <p id="taxResult" class="mt-2 font-semibold"></p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold mb-2">Preço Unitário</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" id="totalPrice" class="px-4 py-2 border rounded-lg" placeholder="Preço total">
                            <input type="number" id="quantity" class="px-4 py-2 border rounded-lg" placeholder="Quantidade">
                        </div>
                        <button onclick="calculateUnitPrice()" class="mt-2 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">Calcular Preço Unitário</button>
                        <p id="unitPriceResult" class="mt-2 font-semibold"></p>
                    </div>
                </div>
            `;
            break;
    }
}

// Taxas de câmbio aproximadas (em produção, usar API real)
const exchangeRates = {
    BRL: { USD: 0.20, EUR: 0.18, GBP: 0.16, JPY: 29.5 },
    USD: { BRL: 5.0, EUR: 0.92, GBP: 0.79, JPY: 148 },
    EUR: { BRL: 5.5, USD: 1.09, GBP: 0.86, JPY: 161 },
    GBP: { BRL: 6.3, USD: 1.27, EUR: 1.16, JPY: 187 },
    JPY: { BRL: 0.034, USD: 0.0068, EUR: 0.0062, GBP: 0.0053 }
};

function convertCurrency() {
    const value = parseFloat(document.getElementById('currencyValue').value);
    const from = document.getElementById('currencyFrom').value;
    const to = document.getElementById('currencyTo').value;
    const customRate = document.getElementById('exchangeRate').value;
    
    if (isNaN(value)) {
        alert('Por favor, digite um valor válido');
        return;
    }
    
    let rate;
    if (customRate && !isNaN(parseFloat(customRate))) {
        rate = parseFloat(customRate);
    } else {
        rate = exchangeRates[from][to] || 1;
    }
    
    const result = value * rate;
    document.getElementById('currencyResult').classList.remove('hidden');
    document.getElementById('currencyResultValue').textContent = 
        `${value.toFixed(2)} ${from} = ${result.toFixed(2)} ${to}`;
    document.getElementById('currencyRateInfo').textContent = 
        `Taxa utilizada: 1 ${from} = ${rate.toFixed(4)} ${to}`;
}

function calculateLoan() {
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const rate = parseFloat(document.getElementById('loanRate').value) / 100 / 12;
    const term = parseInt(document.getElementById('loanTerm').value);
    
    if (isNaN(amount) || isNaN(rate) || isNaN(term) || amount <= 0 || term <= 0) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    const monthlyPayment = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPaid = monthlyPayment * term;
    const totalInterest = totalPaid - amount;
    
    document.getElementById('loanResult').classList.remove('hidden');
    document.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(2);
    document.getElementById('totalPaid').textContent = totalPaid.toFixed(2);
    document.getElementById('totalInterest').textContent = totalInterest.toFixed(2);
}

function calculateTip() {
    const bill = parseFloat(document.getElementById('billAmount').value);
    const percent = parseFloat(document.getElementById('tipPercent').value);
    
    if (isNaN(bill) || isNaN(percent)) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    const tip = bill * (percent / 100);
    const total = bill + tip;
    
    document.getElementById('tipResult').innerHTML = 
        `Gorjeta: ${tip.toFixed(2)}<br>Total: ${total.toFixed(2)}`;
}

function calculateSalesTax() {
    const price = parseFloat(document.getElementById('priceBeforeTax').value);
    const rate = parseFloat(document.getElementById('taxRate').value);
    
    if (isNaN(price) || isNaN(rate)) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    const tax = price * (rate / 100);
    const total = price + tax;
    
    document.getElementById('taxResult').innerHTML = 
        `Imposto: ${tax.toFixed(2)}<br>Total com imposto: ${total.toFixed(2)}`;
}

function calculateUnitPrice() {
    const total = parseFloat(document.getElementById('totalPrice').value);
    const qty = parseFloat(document.getElementById('quantity').value);
    
    if (isNaN(total) || isNaN(qty) || qty <= 0) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    const unitPrice = total / qty;
    document.getElementById('unitPriceResult').textContent = 
        `Preço unitário: ${unitPrice.toFixed(2)}`;
}

// ==================== SAÚDE ====================
function renderHealthCalculator(container) {
    switch(currentSubcategory) {
        case 'bmi':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-weight mr-2"></i>Calculadora de IMC</h2>
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                            <input type="number" id="bmiWeight" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 70">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Altura (m)</label>
                            <input type="number" id="bmiHeight" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 1.75">
                        </div>
                    </div>
                    <button onclick="calculateBMI()" class="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">Calcular IMC</button>
                    <div id="bmiResult" class="p-4 rounded-lg result-box hidden">
                        <p class="text-lg font-semibold">IMC: <span id="bmiValue"></span></p>
                        <p class="font-semibold" id="bmiCategory"></p>
                    </div>
                </div>
            `;
            break;
        case 'bodyFat':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-percentage mr-2"></i>Calculadora de Gordura Corporal</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                        <select id="bodyFatGender" class="w-full px-4 py-2 border rounded-lg">
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                            <input type="number" id="bodyFatWeight" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 70">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
                            <input type="number" id="bodyFatHeight" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 175">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                            <input type="number" id="bodyFatAge" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 30">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cintura (cm)</label>
                            <input type="number" id="bodyFatWaist" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 80">
                        </div>
                    </div>
                    <div id="hipContainer">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Quadril (cm) - apenas feminino</label>
                        <input type="number" id="bodyFatHip" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 100">
                    </div>
                    <div id="neckContainer" class="hidden">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Pescoço (cm) - apenas masculino</label>
                        <input type="number" id="bodyFatNeck" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 35">
                    </div>
                    <button onclick="calculateBodyFat()" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Calcular Gordura Corporal</button>
                    <div id="bodyFatResult" class="p-4 rounded-lg result-box hidden">
                        <p class="text-lg font-semibold">Gordura Corporal: <span id="bodyFatValue"></span></p>
                        <p class="font-semibold" id="bodyFatCategory"></p>
                    </div>
                </div>
            `;
            
            document.getElementById('bodyFatGender').addEventListener('change', function() {
                if (this.value === 'female') {
                    document.getElementById('hipContainer').classList.remove('hidden');
                    document.getElementById('neckContainer').classList.add('hidden');
                } else {
                    document.getElementById('hipContainer').classList.add('hidden');
                    document.getElementById('neckContainer').classList.remove('hidden');
                }
            });
            break;
        case 'calories':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-fire mr-2"></i>Calculadora de Calorias</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                        <select id="calGender" class="w-full px-4 py-2 border rounded-lg">
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                            <input type="number" id="calWeight" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 70">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
                            <input type="number" id="calHeight" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 175">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                            <input type="number" id="calAge" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 30">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nível de Atividade</label>
                            <select id="calActivity" class="w-full px-4 py-2 border rounded-lg">
                                <option value="1.2">Sedentário</option>
                                <option value="1.375">Levemente ativo</option>
                                <option value="1.55">Moderadamente ativo</option>
                                <option value="1.725">Muito ativo</option>
                                <option value="1.9">Extremamente ativo</option>
                            </select>
                        </div>
                    </div>
                    <button onclick="calculateCalories()" class="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">Calcular TMB</button>
                    <div id="calResult" class="p-4 rounded-lg result-box hidden">
                        <p class="font-semibold">Taxa Metabólica Basal (TMB): <span id="tmbValue"></span> kcal/dia</p>
                        <p class="font-semibold">Gasto Calórico Total: <span id="tdeeValue"></span> kcal/dia</p>
                    </div>
                </div>
            `;
            break;
    }
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const height = parseFloat(document.getElementById('bmiHeight').value);
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    const bmi = weight / (height * height);
    
    let category;
    if (bmi < 18.5) category = 'Abaixo do peso';
    else if (bmi < 25) category = 'Peso normal';
    else if (bmi < 30) category = 'Sobrepeso';
    else if (bmi < 35) category = 'Obesidade grau I';
    else if (bmi < 40) category = 'Obesidade grau II';
    else category = 'Obesidade grau III';
    
    document.getElementById('bmiResult').classList.remove('hidden');
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiCategory').textContent = `Categoria: ${category}`;
}

function calculateBodyFat() {
    const gender = document.getElementById('bodyFatGender').value;
    const weight = parseFloat(document.getElementById('bodyFatWeight').value);
    const height = parseFloat(document.getElementById('bodyFatHeight').value);
    const age = parseFloat(document.getElementById('bodyFatAge').value);
    const waist = parseFloat(document.getElementById('bodyFatWaist').value);
    
    if (isNaN(weight) || isNaN(height) || isNaN(age) || isNaN(waist)) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    let bodyFat;
    
    if (gender === 'male') {
        const neck = parseFloat(document.getElementById('bodyFatNeck').value);
        if (isNaN(neck)) {
            alert('Por favor, digite a circunferência do pescoço');
            return;
        }
        // Fórmula do método da Marinha dos EUA para homens
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        const hip = parseFloat(document.getElementById('bodyFatHip').value);
        if (isNaN(hip)) {
            alert('Por favor, digite a circunferência do quadril');
            return;
        }
        // Fórmula do método da Marinha dos EUA para mulheres
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
    
    let category;
    if (gender === 'male') {
        if (bodyFat < 6) category = 'Essencial';
        else if (bodyFat < 14) category = 'Atleta';
        else if (bodyFat < 18) category = 'Fitness';
        else if (bodyFat < 25) category = 'Média';
        else category = 'Acima da média';
    } else {
        if (bodyFat < 14) category = 'Essencial';
        else if (bodyFat < 21) category = 'Atleta';
        else if (bodyFat < 25) category = 'Fitness';
        else if (bodyFat < 32) category = 'Média';
        else category = 'Acima da média';
    }
    
    document.getElementById('bodyFatResult').classList.remove('hidden');
    document.getElementById('bodyFatValue').textContent = bodyFat.toFixed(1) + '%';
    document.getElementById('bodyFatCategory').textContent = `Categoria: ${category}`;
}

function calculateCalories() {
    const gender = document.getElementById('calGender').value;
    const weight = parseFloat(document.getElementById('calWeight').value);
    const height = parseFloat(document.getElementById('calHeight').value);
    const age = parseFloat(document.getElementById('calAge').value);
    const activity = parseFloat(document.getElementById('calActivity').value);
    
    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    // Fórmula de Mifflin-St Jeor
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    const tdee = bmr * activity;
    
    document.getElementById('calResult').classList.remove('hidden');
    document.getElementById('tmbValue').textContent = bmr.toFixed(0);
    document.getElementById('tdeeValue').textContent = tdee.toFixed(0);
}

// ==================== DATA E HORA ====================
function renderDateTimeCalculator(container) {
    switch(currentSubcategory) {
        case 'age':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-birthday-cake mr-2"></i>Calculadora de Idade</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                        <input type="date" id="birthDate" class="w-full px-4 py-2 border rounded-lg">
                    </div>
                    <button onclick="calculateAge()" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Calcular Idade</button>
                    <div id="ageResult" class="p-4 rounded-lg result-box hidden">
                        <p class="text-lg font-semibold"><span id="ageValue"></span></p>
                    </div>
                </div>
            `;
            break;
        case 'dateCalc':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-calendar-plus mr-2"></i>Adicionar/Subtrair Datas</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
                        <input type="date" id="initialDate" class="w-full px-4 py-2 border rounded-lg">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Operação</label>
                            <select id="dateOperation" class="w-full px-4 py-2 border rounded-lg">
                                <option value="add">Adicionar</option>
                                <option value="subtract">Subtrair</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                            <select id="dateUnit" class="w-full px-4 py-2 border rounded-lg">
                                <option value="days">Dias</option>
                                <option value="weeks">Semanas</option>
                                <option value="months">Meses</option>
                                <option value="years">Anos</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                        <input type="number" id="dateAmount" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 30">
                    </div>
                    <button onclick="calculateDate()" class="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">Calcular</button>
                    <div id="dateCalcResult" class="p-4 rounded-lg result-box hidden">
                        <p class="text-lg font-semibold">Resultado: <span id="dateCalcValue"></span></p>
                    </div>
                </div>
            `;
            break;
        case 'interval':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-clock mr-2"></i>Calculadora de Intervalo</h2>
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
                            <input type="date" id="intervalStart" class="w-full px-4 py-2 border rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Data Final</label>
                            <input type="date" id="intervalEnd" class="w-full px-4 py-2 border rounded-lg">
                        </div>
                    </div>
                    <button onclick="calculateInterval()" class="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700">Calcular Intervalo</button>
                    <div id="intervalResult" class="p-4 rounded-lg result-box hidden">
                        <p class="text-lg font-semibold"><span id="intervalValue"></span></p>
                    </div>
                </div>
            `;
            break;
    }
}

function calculateAge() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    
    if (isNaN(birthDate.getTime())) {
        alert('Por favor, selecione uma data válida');
        return;
    }
    
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    
    document.getElementById('ageResult').classList.remove('hidden');
    document.getElementById('ageValue').innerHTML = 
        `${years} anos, ${months} meses e ${days} dias<br>Total: ${totalDays} dias`;
}

function calculateDate() {
    const initialDate = new Date(document.getElementById('initialDate').value);
    const operation = document.getElementById('dateOperation').value;
    const unit = document.getElementById('dateUnit').value;
    const amount = parseInt(document.getElementById('dateAmount').value);
    
    if (isNaN(initialDate.getTime()) || isNaN(amount)) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    const result = new Date(initialDate);
    
    if (operation === 'add') {
        switch(unit) {
            case 'days': result.setDate(result.getDate() + amount); break;
            case 'weeks': result.setDate(result.getDate() + amount * 7); break;
            case 'months': result.setMonth(result.getMonth() + amount); break;
            case 'years': result.setFullYear(result.getFullYear() + amount); break;
        }
    } else {
        switch(unit) {
            case 'days': result.setDate(result.getDate() - amount); break;
            case 'weeks': result.setDate(result.getDate() - amount * 7); break;
            case 'months': result.setMonth(result.getMonth() - amount); break;
            case 'years': result.setFullYear(result.getFullYear() - amount); break;
        }
    }
    
    document.getElementById('dateCalcResult').classList.remove('hidden');
    document.getElementById('dateCalcValue').textContent = result.toLocaleDateString('pt-BR');
}

function calculateInterval() {
    const start = new Date(document.getElementById('intervalStart').value);
    const end = new Date(document.getElementById('intervalEnd').value);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert('Por favor, selecione datas válidas');
        return;
    }
    
    const diff = Math.abs(end - start);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);
    
    document.getElementById('intervalResult').classList.remove('hidden');
    document.getElementById('intervalValue').innerHTML = 
        `${days} dias<br>${weeks} semanas<br>${months.toFixed(1)} meses<br>${years.toFixed(2)} anos`;
}

// ==================== TRANSPORTE ====================
function renderTransportCalculator(container) {
    switch(currentSubcategory) {
        case 'mileage':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-road mr-2"></i>Calculadora de Quilometragem</h2>
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Quilometragem Inicial (km)</label>
                            <input type="number" id="startMileage" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 10000">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Quilometragem Final (km)</label>
                            <input type="number" id="endMileage" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 10500">
                        </div>
                    </div>
                    <button onclick="calculateMileage()" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Calcular</button>
                    <div id="mileageResult" class="p-4 rounded-lg result-box hidden">
                        <p class="text-lg font-semibold">Distância percorrida: <span id="mileageValue"></span> km</p>
                    </div>
                </div>
            `;
            break;
        case 'fuel':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-gas-pump mr-2"></i>Calculadora de Combustível</h2>
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Distância (km)</label>
                            <input type="number" id="fuelDistance" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Combustível Consumido (L)</label>
                            <input type="number" id="fuelConsumed" class="w-full px-4 py-2 border rounded-lg" placeholder="Ex: 40">
                        </div>
                    </div>
                    <button onclick="calculateFuelEfficiency()" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Calcular</button>
                    <div id="fuelResult" class="p-4 rounded-lg result-box hidden">
                        <p class="font-semibold">Consumo: <span id="fuelKmL"></span> km/L</p>
                        <p class="font-semibold">Consumo: <span id="fuelL100km"></span> L/100km</p>
                    </div>
                </div>
            `;
            break;
    }
}

function calculateMileage() {
    const start = parseFloat(document.getElementById('startMileage').value);
    const end = parseFloat(document.getElementById('endMileage').value);
    
    if (isNaN(start) || isNaN(end)) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    const distance = Math.abs(end - start);
    
    document.getElementById('mileageResult').classList.remove('hidden');
    document.getElementById('mileageValue').textContent = distance.toFixed(2);
}

function calculateFuelEfficiency() {
    const distance = parseFloat(document.getElementById('fuelDistance').value);
    const fuel = parseFloat(document.getElementById('fuelConsumed').value);
    
    if (isNaN(distance) || isNaN(fuel) || distance <= 0 || fuel <= 0) {
        alert('Por favor, digite valores válidos');
        return;
    }
    
    const kmL = distance / fuel;
    const l100km = (fuel / distance) * 100;
    
    document.getElementById('fuelResult').classList.remove('hidden');
    document.getElementById('fuelKmL').textContent = kmL.toFixed(2);
    document.getElementById('fuelL100km').textContent = l100km.toFixed(2);
}

// ==================== ENGENHARIA ELÉTRICA ====================
function renderElectricalCalculator(container) {
    switch(currentSubcategory) {
        case 'ohm':
            container.innerHTML = `
                <h2 class="text-2xl font-bold mb-6 text-gray-800"><i class="fas fa-bolt mr-2"></i>Lei de Ohm</h2>
                <p class="text-gray-600 mb-4">Calcule qualquer grandeza elétrica conhecendo as outras três.</p>
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tensão (V)</label>
                            <input type="number" id="ohmVoltage" class="w-full px-4 py-2 border rounded-lg" placeholder="Volts">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Corrente (A)</label>
                            <input type="number" id="ohmCurrent" class="w-full px-4 py-2 border rounded-lg" placeholder="Amperes">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Resistência (Ω)</label>
                            <input type="number" id="ohmResistance" class="w-full px-4 py-2 border rounded-lg" placeholder="Ohms">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Potência (W)</label>
                            <input type="number" id="ohmPower" class="w-full px-4 py-2 border rounded-lg" placeholder="Watts">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="calculateOhm('voltage')" class="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">Calcular Tensão</button>
                        <button onclick="calculateOhm('current')" class="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Calcular Corrente</button>
                        <button onclick="calculateOhm('resistance')" class="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Calcular Resistência</button>
                        <button onclick="calculateOhm('power')" class="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Calcular Potência</button>
                    </div>
                    <div id="ohmResult" class="p-4 rounded-lg result-box hidden">
                        <p class="text-lg font-semibold"><span id="ohmResultValue"></span></p>
                    </div>
                </div>
            `;
            break;
    }
}

function calculateOhm(calcType) {
    const voltage = parseFloat(document.getElementById('ohmVoltage').value);
    const current = parseFloat(document.getElementById('ohmCurrent').value);
    const resistance = parseFloat(document.getElementById('ohmResistance').value);
    const power = parseFloat(document.getElementById('ohmPower').value);
    
    let result;
    let resultText;
    
    switch(calcType) {
        case 'voltage':
            if (isNaN(current) || isNaN(resistance) || current <= 0 || resistance <= 0) {
                alert('Para calcular tensão, informe corrente e resistência');
                return;
            }
            result = current * resistance;
            resultText = `Tensão = ${result.toFixed(4)} V`;
            document.getElementById('ohmVoltage').value = result.toFixed(4);
            break;
        case 'current':
            if (isNaN(voltage) || isNaN(resistance) || voltage <= 0 || resistance <= 0) {
                alert('Para calcular corrente, informe tensão e resistência');
                return;
            }
            result = voltage / resistance;
            resultText = `Corrente = ${result.toFixed(4)} A`;
            document.getElementById('ohmCurrent').value = result.toFixed(4);
            break;
        case 'resistance':
            if (isNaN(voltage) || isNaN(current) || voltage <= 0 || current <= 0) {
                alert('Para calcular resistência, informe tensão e corrente');
                return;
            }
            result = voltage / current;
            resultText = `Resistência = ${result.toFixed(4)} Ω`;
            document.getElementById('ohmResistance').value = result.toFixed(4);
            break;
        case 'power':
            if (!isNaN(voltage) && !isNaN(current) && voltage > 0 && current > 0) {
                result = voltage * current;
                resultText = `Potência = ${result.toFixed(4)} W (usando V × I)`;
            } else if (!isNaN(voltage) && !isNaN(resistance) && voltage > 0 && resistance > 0) {
                result = (voltage * voltage) / resistance;
                resultText = `Potência = ${result.toFixed(4)} W (usando V²/R)`;
            } else if (!isNaN(current) && !isNaN(resistance) && current > 0 && resistance > 0) {
                result = current * current * resistance;
                resultText = `Potência = ${result.toFixed(4)} W (usando I² × R)`;
            } else {
                alert('Para calcular potência, informe:\n- Tensão e Corrente, ou\n- Tensão e Resistência, ou\n- Corrente e Resistência');
                return;
            }
            document.getElementById('ohmPower').value = result.toFixed(4);
            break;
    }
    
    document.getElementById('ohmResult').classList.remove('hidden');
    document.getElementById('ohmResultValue').textContent = resultText;
}