import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 1,
    name: '泰坦尼克号生存预测分析',
    description: '通过数据清洗和探索性分析，研究乘客特征与生存率之间的关系',
    coreTasks: [
      '数据清洗：处理缺失值和异常值',
      '探索性分析：分析乘客特征分布',
      '可视化：绘制性别、舱位与生存率的关系图'
    ],
    techStack: ['pandas', 'matplotlib', 'seaborn'],
    expectedOutput: [
      '数据清洗报告',
      '生存率分析可视化图表',
      '掌握EDA全流程'
    ],
    initialCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 创建模拟的泰坦尼克号数据
data = {
    'PassengerId': range(1, 101),
    'Survived': np.random.randint(0, 2, 100),
    'Pclass': np.random.randint(1, 4, 100),
    'Sex': np.random.choice(['male', 'female'], 100),
    'Age': np.random.randint(0, 80, 100),
    'Fare': np.random.uniform(0, 100, 100)
}

df = pd.DataFrame(data)
print("数据集预览:")
print(df.head())
print("\\n基本统计信息:")
print(df.describe())

# 计算不同性别的生存率
survival_by_sex = df.groupby('Sex')['Survived'].mean()
print("\\n不同性别的生存率:")
print(survival_by_sex)

# 计算不同舱位的生存率
survival_by_class = df.groupby('Pclass')['Survived'].mean()
print("\\n不同舱位的生存率:")
print(survival_by_class)`,
    category: '基础数据处理',
    difficulty: 'beginner'
  },
  {
    id: 2,
    name: '新冠疫情趋势可视化项目',
    description: '处理全球疫情时间序列数据，计算关键指标并进行多维度可视化',
    coreTasks: [
      '时间序列数据处理',
      '计算日增确诊、死亡率等指标',
      '绘制趋势图和热力图'
    ],
    techStack: ['pandas', 'matplotlib', 'seaborn'],
    expectedOutput: [
      '疫情数据仪表盘',
      '关键指标计算脚本',
      '掌握时间序列分析'
    ],
    initialCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# 创建模拟的疫情数据
dates = [datetime.now() - timedelta(days=i) for i in range(99, -1, -1)]
cases = np.cumsum(np.random.randint(100, 500, 100))
deaths = np.cumsum(np.random.randint(5, 20, 100))

df = pd.DataFrame({
    'date': dates,
    'confirmed': cases,
    'deaths': deaths
})

print("疫情数据预览:")
print(df.head())

# 计算日增确诊
df['new_cases'] = df['confirmed'].diff()
df['new_deaths'] = df['deaths'].diff()

# 计算7日滚动平均
df['cases_7day_avg'] = df['new_cases'].rolling(7).mean()

print("\\n包含新增数据的预览:")
print(df.tail())

# 简单的趋势分析
print(f"\\n总确诊: {df['confirmed'].iloc[-1]}")
print(f"总死亡: {df['deaths'].iloc[-1]}")
print(f"死亡率: {(df['deaths'].iloc[-1]/df['confirmed'].iloc[-1]*100):.2f}%")`,
    category: '基础数据处理',
    difficulty: 'beginner'
  },
  {
    id: 3,
    name: '电商销售数据多维透视分析',
    description: '对电商销售数据进行多维度分析，构建RFM模型雏形',
    coreTasks: [
      '按时间、品类、地区分析销售数据',
      '构建RFM用户分层模型',
      '分析商品销售结构'
    ],
    techStack: ['pandas', 'matplotlib'],
    expectedOutput: [
      '销售分析简报',
      'RFM分析结果',
      '掌握多维数据透视'
    ],
    initialCode: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 创建模拟的电商销售数据
np.random.seed(42)
n_records = 500

customers = [f'CUST_{i:03d}' for i in range(1, 101)]
products = ['手机', '电脑', '平板', '耳机', '手表', '键盘', '鼠标', '显示器']
regions = ['华东', '华南', '华北', '西南', '西北', '东北']

start_date = datetime.now() - timedelta(days=365)
dates = [start_date + timedelta(days=np.random.randint(0, 365)) for _ in range(n_records)]

data = {
    'order_id': range(1, n_records + 1),
    'customer_id': np.random.choice(customers, n_records),
    'product': np.random.choice(products, n_records),
    'region': np.random.choice(regions, n_records),
    'amount': np.random.randint(100, 10000, n_records),
    'quantity': np.random.randint(1, 5, n_records),
    'order_date': dates
}

df = pd.DataFrame(data)
df['total'] = df['amount'] * df['quantity']

print("销售数据预览:")
print(df.head())

# 按地区分析销售额
sales_by_region = df.groupby('region')['total'].sum().sort_values(ascending=False)
print("\\n各地区销售额:")
print(sales_by_region)

# 按产品分析
sales_by_product = df.groupby('product')['total'].agg(['sum', 'count']).sort_values('sum', ascending=False)
print("\\n各产品销售情况:")
print(sales_by_product)

# 简单的RFM雏形
reference_date = df['order_date'].max()
rfm = df.groupby('customer_id').agg({
    'order_date': lambda x: (reference_date - x.max()).days,
    'order_id': 'count',
    'total': 'sum'
})
rfm.columns = ['Recency', 'Frequency', 'Monetary']
print("\\nRFM分析预览:")
print(rfm.head())`,
    category: '核心分析方法',
    difficulty: 'intermediate'
  },
  {
    id: 4,
    name: 'A/B测试效果统计检验',
    description: '设计A/B测试实验，使用统计方法检验实验效果',
    coreTasks: [
      '实验数据分组处理',
      '使用t检验和卡方检验',
      '可视化实验结果'
    ],
    techStack: ['scipy.stats', 'pandas', 'matplotlib'],
    expectedOutput: [
      'A/B测试分析报告',
      '统计显著性结论',
      '掌握实验设计方法'
    ],
    initialCode: `import pandas as pd
import numpy as np
from scipy import stats

# 创建模拟的A/B测试数据
np.random.seed(42)
n_control = 1000
n_treatment = 1000

# 对照组数据
control_conversion = np.random.binomial(1, 0.10, n_control)
control_revenue = np.where(control_conversion == 1, 
                           np.random.normal(50, 10, n_control), 0)

# 实验组数据 (转化率提升)
treatment_conversion = np.random.binomial(1, 0.12, n_treatment)
treatment_revenue = np.where(treatment_conversion == 1, 
                             np.random.normal(52, 10, n_treatment), 0)

# 组合数据
df_control = pd.DataFrame({
    'group': 'control',
    'conversion': control_conversion,
    'revenue': control_revenue
})

df_treatment = pd.DataFrame({
    'group': 'treatment',
    'conversion': treatment_conversion,
    'revenue': treatment_revenue
})

df = pd.concat([df_control, df_treatment], ignore_index=True)

print("A/B测试数据预览:")
print(df.head())

# 计算转化率
conv_control = df_control['conversion'].mean()
conv_treatment = df_treatment['conversion'].mean()
print(f"\\n对照组转化率: {conv_control:.4f}")
print(f"实验组转化率: {conv_treatment:.4f}")
print(f"提升幅度: {(conv_treatment - conv_control)/conv_control*100:.2f}%")

# 使用卡方检验转化率差异
contingency_table = pd.crosstab(df['group'], df['conversion'])
print("\\n列联表:")
print(contingency_table)

chi2, p_value, dof, expected = stats.chi2_contingency(contingency_table)
print(f"\\n卡方检验结果:")
print(f"卡方值: {chi2:.4f}")
print(f"P值: {p_value:.4f}")
print(f"显著性: {'显著' if p_value < 0.05 else '不显著'}")

# 使用t检验收入差异
revenue_control = df_control[df_control['conversion'] == 1]['revenue']
revenue_treatment = df_treatment[df_treatment['conversion'] == 1]['revenue']

t_stat, t_p_value = stats.ttest_ind(revenue_control, revenue_treatment)
print(f"\\n收入t检验结果:")
print(f"t统计量: {t_stat:.4f}")
print(f"P值: {t_p_value:.4f}")`,
    category: '核心分析方法',
    difficulty: 'intermediate'
  },
  {
    id: 5,
    name: '购物篮商品关联规则挖掘',
    description: '挖掘订单数据中的商品关联规则，发现商品组合规律',
    coreTasks: [
      '订单商品数据处理',
      '计算支持度、置信度、提升度',
      '发现强关联规则'
    ],
    techStack: ['pandas', 'itertools'],
    expectedOutput: [
      '商品关联规则表',
      '关联规则可视化',
      '掌握关联分析方法'
    ],
    initialCode: `import pandas as pd
import numpy as np
from itertools import combinations
from collections import defaultdict

# 创建模拟的购物篮数据
np.random.seed(42)
products = ['牛奶', '面包', '鸡蛋', '啤酒', '尿布', '可乐', '薯片', '饼干', '酸奶', '水果']
n_transactions = 200

transactions = []
for _ in range(n_transactions):
    # 随机选择商品，某些商品组合概率更高
    n_items = np.random.randint(2, 6)
    items = set()
    
    # 添加一些常见的组合
    if np.random.random() < 0.3:
        items.update(['啤酒', '尿布'])
    if np.random.random() < 0.4:
        items.update(['牛奶', '面包'])
    if np.random.random() < 0.25:
        items.update(['薯片', '可乐'])
    
    # 补充随机商品
    while len(items) < n_items:
        item = np.random.choice(products)
        items.add(item)
    
    transactions.append(list(items))

print("购物篮数据预览 (前5条):")
for i, t in enumerate(transactions[:5], 1):
    print(f"订单{i}: {t}")

# 计算单个商品的支持度
item_counts = defaultdict(int)
for t in transactions:
    for item in t:
        item_counts[item] += 1

support_single = {item: count/n_transactions for item, count in item_counts.items()}
print("\\n商品支持度:")
for item, supp in sorted(support_single.items(), key=lambda x: -x[1]):
    print(f"{item}: {supp:.2%}")

# 计算商品对的支持度和置信度
pair_counts = defaultdict(int)
for t in transactions:
    for pair in combinations(sorted(t), 2):
        pair_counts[pair] += 1

print("\\nTop 10 商品组合:")
top_pairs = sorted(pair_counts.items(), key=lambda x: -x[1])[:10]
for pair, count in top_pairs:
    supp = count / n_transactions
    conf_ab = count / item_counts[pair[0]]
    conf_ba = count / item_counts[pair[1]]
    lift = supp / (support_single[pair[0]] * support_single[pair[1]])
    print(f"{pair[0]} & {pair[1]}: 支持度={supp:.2%}, 置信度(A→B)={conf_ab:.2%}, 提升度={lift:.2f}")`,
    category: '核心分析方法',
    difficulty: 'intermediate'
  },
  {
    id: 6,
    name: '用户流失预测与画像分析',
    description: '构建用户流失预测模型，分析高风险用户特征',
    coreTasks: [
      '特征工程与数据清洗',
      '构建逻辑回归模型',
      '用户画像分析'
    ],
    techStack: ['pandas', 'scikit-learn', 'matplotlib'],
    expectedOutput: [
      '用户流失预测模型',
      '高风险用户画像',
      '掌握监督学习建模'
    ],
    initialCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score

# 创建模拟的用户数据
np.random.seed(42)
n_users = 1000

data = {
    'user_id': range(1, n_users + 1),
    'tenure': np.random.randint(1, 36, n_users),
    'monthly_charges': np.random.uniform(20, 150, n_users),
    'total_charges': lambda x: x['tenure'] * x['monthly_charges'] * np.random.uniform(0.8, 1.2, n_users),
    'support_calls': np.random.poisson(2, n_users),
    'contract_type': np.random.choice(['monthly', 'yearly', 'two_year'], n_users, p=[0.5, 0.3, 0.2]),
    'internet_service': np.random.choice(['DSL', 'Fiber', 'No'], n_users, p=[0.4, 0.4, 0.2]),
    'churn': np.random.randint(0, 2, n_users)
}

df = pd.DataFrame(data)
df['total_charges'] = df['tenure'] * df['monthly_charges'] * np.random.uniform(0.8, 1.2, n_users)

# 调整流失概率，让某些特征更相关
df.loc[df['tenure'] < 6, 'churn'] = np.random.binomial(1, 0.4, sum(df['tenure'] < 6))
df.loc[df['contract_type'] == 'monthly', 'churn'] = np.random.binomial(1, 0.35, sum(df['contract_type'] == 'monthly'))

print("用户数据预览:")
print(df.head())
print(f"\\n整体流失率: {df['churn'].mean():.2%}")

# 特征工程
df_encoded = pd.get_dummies(df.drop(['user_id'], axis=1), drop_first=True)

# 准备训练数据
X = df_encoded.drop(['churn'], axis=1)
y = df_encoded['churn']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 训练模型
model = LogisticRegression(random_state=42)
model.fit(X_train_scaled, y_train)

# 预测
y_pred = model.predict(X_test_scaled)
y_prob = model.predict_proba(X_test_scaled)[:, 1]

print("\\n模型评估:")
print(f"AUC: {roc_auc_score(y_test, y_prob):.4f}")
print(classification_report(y_test, y_pred))

# 特征重要性
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': abs(model.coef_[0])
}).sort_values('importance', ascending=False)

print("\\nTop 10 重要特征:")
print(feature_importance.head(10))`,
    category: '核心分析方法',
    difficulty: 'advanced'
  },
  {
    id: 7,
    name: '电影评分与票房分析项目',
    description: '分析电影评分与票房的关系，构建票房预测模型',
    coreTasks: [
      '电影数据清洗与合并',
      '评分、票房相关性分析',
      '线性回归预测票房'
    ],
    techStack: ['pandas', 'seaborn', 'scikit-learn'],
    expectedOutput: [
      '电影数据分析报告',
      '票房预测模型',
      '掌握回归分析方法'
    ],
    initialCode: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# 创建模拟的电影数据
np.random.seed(42)
n_movies = 200

genres = ['动作', '喜剧', '剧情', '科幻', '恐怖', '动画', '爱情', '冒险']

data = {
    'movie_id': range(1, n_movies + 1),
    'title': [f'电影{i}' for i in range(1, n_movies + 1)],
    'genre': np.random.choice(genres, n_movies),
    'budget': np.random.randint(10, 200, n_movies) * 1000000,
    'rating': np.random.uniform(3.0, 9.5, n_movies),
    'votes': np.random.randint(1000, 100000, n_movies),
    'runtime': np.random.randint(80, 180, n_movies),
    'year': np.random.randint(2010, 2024, n_movies)
}

df = pd.DataFrame(data)

# 生成票房，与预算和评分正相关
base_boxoffice = df['budget'] * np.random.uniform(0.5, 3.0, n_movies)
rating_effect = (df['rating'] - 6) * 5000000
df['boxoffice'] = base_boxoffice + rating_effect + np.random.normal(0, 10000000, n_movies)
df['boxoffice'] = df['boxoffice'].clip(lower=1000000)

print("电影数据预览:")
print(df.head())
print("\\n基本统计:")
print(df[['budget', 'boxoffice', 'rating', 'votes', 'runtime']].describe())

# 相关性分析
correlation = df[['budget', 'boxoffice', 'rating', 'votes', 'runtime']].corr()
print("\\n相关性矩阵:")
print(correlation)

# 准备训练数据
X = df[['budget', 'rating', 'votes', 'runtime']]
y = df['boxoffice']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 训练线性回归模型
model = LinearRegression()
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

print(f"\\n模型评估:")
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):,.0f}")

print("\\n回归系数:")
for feature, coef in zip(X.columns, model.coef_):
    print(f"{feature}: {coef:.4f}")
print(f"截距: {model.intercept_:.4f}")`,
    category: '高级建模与可视化',
    difficulty: 'advanced'
  },
  {
    id: 8,
    name: '社交媒体文本情感分析',
    description: '对社交媒体文本进行情感分析，了解用户观点倾向',
    coreTasks: [
      '文本数据清洗',
      '情感极性分类',
      '情感可视化与词云'
    ],
    techStack: ['TextBlob', 'pandas', 'wordcloud'],
    expectedOutput: [
      '情感分析结果统计',
      '关键词词云',
      '掌握文本分析方法'
    ],
    initialCode: `import pandas as pd
import numpy as np
from collections import Counter
import re

# 创建模拟的评论文本数据
np.random.seed(42)
n_reviews = 200

positive_words = ['好', '棒', '优秀', '喜欢', '满意', '完美', '推荐', '赞', '精彩', '愉快']
negative_words = ['差', '坏', '失望', '讨厌', '糟糕', '垃圾', '浪费', '差劲', '不满意', '后悔']
neutral_words = ['一般', '普通', '还行', '尚可', '中等', '平淡', '通常', '常规']

sentiments = np.random.choice(['positive', 'negative', 'neutral'], n_reviews, p=[0.4, 0.3, 0.3])

reviews = []
for sentiment in sentiments:
    words = []
    if sentiment == 'positive':
        n_pos = np.random.randint(2, 5)
        words.extend(np.random.choice(positive_words, n_pos))
    elif sentiment == 'negative':
        n_neg = np.random.randint(2, 5)
        words.extend(np.random.choice(negative_words, n_neg))
    else:
        n_neu = np.random.randint(2, 4)
        words.extend(np.random.choice(neutral_words, n_neu))
    
    # 组合成句子
    review = ' '.join(words) + '。'
    reviews.append(review)

df = pd.DataFrame({
    'review_id': range(1, n_reviews + 1),
    'text': reviews,
    'true_sentiment': sentiments
})

print("评论数据预览:")
print(df.head(10))

# 简单的基于词库的情感分析
def simple_sentiment_analysis(text):
    pos_count = sum(1 for word in positive_words if word in text)
    neg_count = sum(1 for word in negative_words if word in text)
    
    if pos_count > neg_count:
        return 'positive'
    elif neg_count > pos_count:
        return 'negative'
    else:
        return 'neutral'

df['predicted_sentiment'] = df['text'].apply(simple_sentiment_analysis)

print("\\n情感分析结果统计:")
print(df['predicted_sentiment'].value_counts())

# 计算准确率
accuracy = (df['true_sentiment'] == df['predicted_sentiment']).mean()
print(f"\\n简单方法准确率: {accuracy:.2%}")

# 词频统计
all_words = []
for text in df['text']:
    all_words.extend(re.findall(r'[\u4e00-\u9fa5]+', text))

word_counts = Counter(all_words)
print("\\nTop 20 高频词:")
print(word_counts.most_common(20))`,
    category: '高级建模与可视化',
    difficulty: 'advanced'
  },
  {
    id: 9,
    name: '股票价格时间序列预测',
    description: '获取股票数据，构建特征，预测未来价格走势',
    coreTasks: [
      '股票数据获取与处理',
      '构建滞后特征和移动平均',
      '线性回归预测'
    ],
    techStack: ['pandas', 'numpy', 'scikit-learn'],
    expectedOutput: [
      '股票价格预测模型',
      '预测结果可视化',
      '掌握时间序列预测'
    ],
    initialCode: `import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from datetime import datetime, timedelta

# 创建模拟的股票数据
np.random.seed(42)
n_days = 252

dates = [datetime.now() - timedelta(days=i) for i in range(n_days-1, -1, -1)]

# 生成带趋势和噪声的价格数据
base_price = 100
trend = np.linspace(0, 30, n_days)
noise = np.random.normal(0, 3, n_days)
prices = base_price + trend + noise
prices = np.cumsum(np.random.normal(0.1, 2, n_days)) + 100

df = pd.DataFrame({
    'date': dates,
    'close': prices,
    'volume': np.random.randint(1000000, 10000000, n_days)
})

# 计算最高价和最低价
df['high'] = df['close'] * (1 + np.random.uniform(0, 0.03, n_days))
df['low'] = df['close'] * (1 - np.random.uniform(0, 0.03, n_days))
df['open'] = df['close'].shift(1) * (1 + np.random.uniform(-0.02, 0.02, n_days))
df.loc[0, 'open'] = df.loc[0, 'close'] * 0.98

print("股票数据预览:")
print(df.head())
print("\\n基本统计:")
print(df.describe())

# 特征工程 - 构建滞后特征
df['returns'] = df['close'].pct_change()
df['lag1'] = df['close'].shift(1)
df['lag2'] = df['close'].shift(2)
df['lag3'] = df['close'].shift(3)
df['MA5'] = df['close'].rolling(5).mean()
df['MA10'] = df['close'].rolling(10).mean()
df['MA20'] = df['close'].rolling(20).mean()
df['volatility'] = df['returns'].rolling(5).std()

# 删除缺失值
df = df.dropna()

# 准备训练数据 - 预测未来1天的收盘价
X = df[['lag1', 'lag2', 'lag3', 'MA5', 'MA10', 'MA20', 'volatility', 'volume']]
y = df['close'].shift(-1)

# 删除最后一行（y为NaN）
X = X.iloc[:-1]
y = y.iloc[:-1]

# 划分训练测试集
train_size = int(len(X) * 0.8)
X_train, X_test = X.iloc[:train_size], X.iloc[train_size:]
y_train, y_test = y.iloc[:train_size], y.iloc[train_size:]

# 训练模型
model = LinearRegression()
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

print(f"\\n模型评估:")
print(f"MAE: {mean_absolute_error(y_test, y_pred):.4f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.4f}")

print("\\n回归系数:")
for feature, coef in zip(X.columns, model.coef_):
    print(f"{feature}: {coef:.6f}")`,
    category: '高级建模与可视化',
    difficulty: 'advanced'
  },
  {
    id: 10,
    name: '电商用户全链路分析项目',
    description: '整合行为、订单、商品数据，进行RFM、关联、流失综合分析',
    coreTasks: [
      '多源数据整合',
      '综合分析（RFM + 关联 + 流失）',
      '业务洞察与建议'
    ],
    techStack: ['pandas', 'numpy'],
    expectedOutput: [
      '综合分析报告',
      '业务优化建议',
      '掌握全流程分析'
    ],
    initialCode: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from collections import defaultdict

# 创建模拟的电商全链路数据
np.random.seed(42)
n_customers = 200
n_products = 50
n_orders = 500
n_behaviors = 2000

# 产品数据
products = [f'P{i:03d}' for i in range(1, n_products + 1)]
categories = ['电子产品', '服装', '食品', '家居', '美妆']
product_data = pd.DataFrame({
    'product_id': products,
    'category': np.random.choice(categories, n_products),
    'price': np.random.randint(50, 5000, n_products)
})

# 用户数据
customers = [f'C{i:03d}' for i in range(1, n_customers + 1)]
customer_data = pd.DataFrame({
    'customer_id': customers,
    'register_date': [datetime.now() - timedelta(days=np.random.randint(30, 730)) for _ in range(n_customers)]
})

# 订单数据
order_dates = [datetime.now() - timedelta(days=np.random.randint(0, 365)) for _ in range(n_orders)]
order_data = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'customer_id': np.random.choice(customers, n_orders),
    'product_id': np.random.choice(products, n_orders),
    'quantity': np.random.randint(1, 5, n_orders),
    'order_date': order_dates
})
order_data = order_data.merge(product_data, on='product_id')
order_data['total_amount'] = order_data['quantity'] * order_data['price']

# 行为数据
behavior_types = ['view', 'cart', 'favorite', 'remove_cart']
behavior_dates = [datetime.now() - timedelta(days=np.random.randint(0, 30)) for _ in range(n_behaviors)]
behavior_data = pd.DataFrame({
    'behavior_id': range(1, n_behaviors + 1),
    'customer_id': np.random.choice(customers, n_behaviors),
    'product_id': np.random.choice(products, n_behaviors),
    'behavior_type': np.random.choice(behavior_types, n_behaviors, p=[0.5, 0.25, 0.15, 0.1]),
    'behavior_time': behavior_dates
})

print("=== 数据预览 ===")
print("\\n产品数据:")
print(product_data.head())
print("\\n用户数据:")
print(customer_data.head())
print("\\n订单数据:")
print(order_data.head())
print("\\n行为数据:")
print(behavior_data.head())

# 1. RFM 分析
reference_date = order_data['order_date'].max()
rfm = order_data.groupby('customer_id').agg({
    'order_date': lambda x: (reference_date - x.max()).days,
    'order_id': 'count',
    'total_amount': 'sum'
})
rfm.columns = ['Recency', 'Frequency', 'Monetary']
print("\\n=== RFM 分析 ===")
print(rfm.head())

# 2. 商品销售分析
product_sales = order_data.groupby(['product_id', 'category']).agg({
    'quantity': 'sum',
    'total_amount': 'sum'
}).sort_values('total_amount', ascending=False)
print("\\n=== 商品销售 Top 10 ===")
print(product_sales.head(10))

# 3. 用户行为分析
behavior_summary = behavior_data.groupby(['customer_id', 'behavior_type']).size().unstack(fill_value=0)
print("\\n=== 用户行为统计 ===")
print(behavior_summary.head())

# 4. 简单的流失标记（90天未购买）
last_purchase = order_data.groupby('customer_id')['order_date'].max()
churn_customers = last_purchase[last_purchase < (reference_date - timedelta(days=90))]
print(f"\\n=== 流失分析 ===")
print(f"流失用户数: {len(churn_customers)}")
print(f"流失率: {len(churn_customers)/n_customers:.2%}")`,
    category: '全流程综合',
    difficulty: 'advanced'
  }
];
