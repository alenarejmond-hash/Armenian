import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, ChevronRight, CheckCircle2, XCircle, AlertTriangle, Lightbulb, ArrowLeft } from 'lucide-react';

const LETTERS_DATA = [
  { id: "ա", printed: "Ա ա", transliteration_ru: "а", mnemonic: "Как обычная 'а', только с хвостиком.", emoji: "🍎" },
  { id: "բ", printed: "Բ բ", transliteration_ru: "б", mnemonic: "Похожа на пузатую Башню.", emoji: "🗼" },
  { id: "գ", printed: "Գ գ", transliteration_ru: "г", mnemonic: "Гора с одной вершиной.", emoji: "⛰️" },
  { id: "դ", printed: "Դ դ", transliteration_ru: "д", mnemonic: "Дом с крышей.", emoji: "🏠" },
  { id: "ե", printed: "Ե ե", transliteration_ru: "е/йэ", mnemonic: "Похожа на русскую 'е', но вытянутую.", emoji: "🪱" },
  { id: "զ", printed: "Զ զ", transliteration_ru: "з", mnemonic: "Змея, свернувшаяся кольцом.", emoji: "🐍" },
  { id: "է", printed: "Է է", transliteration_ru: "э", mnemonic: "Экскаватор с ковшом.", emoji: "🚜" },
  { id: "ը", printed: "Ը ը", transliteration_ru: "ы", mnemonic: "Похожа на перевернутую 'm', звук глубокий.", emoji: "🕳️" },
  { id: "թ", printed: "Թ թ", transliteration_ru: "т (придых)", mnemonic: "Щит и Меч (Твердый).", emoji: "🛡️" },
  { id: "ժ", printed: "Ժ ժ", transliteration_ru: "ж", mnemonic: "Жук с усиками.", emoji: "🪲" },
  { id: "ի", printed: "Ի ի", transliteration_ru: "и", mnemonic: "Игла с ниткой.", emoji: "🪡" },
  { id: "լ", printed: "Լ լ", transliteration_ru: "л", mnemonic: "Лампа на подставке.", emoji: "Л" },
  { id: "խ", printed: "Խ խ", transliteration_ru: "х", mnemonic: "Худой крестик.", emoji: "✖️" },
  { id: "ծ", printed: "Ծ ծ", transliteration_ru: "ц", mnemonic: "Цветок на стебле.", emoji: "🌸" },
  { id: "կ", printed: "Կ կ", transliteration_ru: "к", mnemonic: "Присевшая Кошка.", emoji: "🐈" },
  { id: "հ", printed: "Հ հ", transliteration_ru: "х/г (придых)", mnemonic: "Похожа на английскую 'h'.", emoji: "💨" },
  { id: "ձ", printed: "Ձ ձ", transliteration_ru: "дз", mnemonic: "Рыбка (Дзук).", emoji: "🐟" },
  { id: "ղ", printed: "Ղ ղ", transliteration_ru: "гх", mnemonic: "Лебедь плывущий.", emoji: "🦢" },
  { id: "ճ", printed: "Ճ ճ", transliteration_ru: "ч", mnemonic: "Чашка чая.", emoji: "☕" },
  { id: "մ", printed: "Մ մ", transliteration_ru: "м", mnemonic: "Макдональдс (М).", emoji: "🍟" },
  { id: "յ", printed: "Յ յ", transliteration_ru: "й", mnemonic: "Йог сидит.", emoji: "🧘" },
  { id: "ն", printed: "Ն ն", transliteration_ru: "н", mnemonic: "Носорог с рогом вверх.", emoji: "🦏" },
  { id: "շ", printed: "Շ շ", transliteration_ru: "ш", mnemonic: "Шахматная фигура.", emoji: "♟️" },
  { id: "ո", printed: "Ո ո", transliteration_ru: "во/о", mnemonic: "Ворота (арка).", emoji: "⛩️" },
  { id: "չ", printed: "Չ չ", transliteration_ru: "ч (придых)", mnemonic: "Черпак (половник).", emoji: "🥄" },
  { id: "պ", printed: "Պ պ", transliteration_ru: "п", mnemonic: "Прямая палка с петлей.", emoji: "🦯" },
  { id: "ջ", printed: "Ջ ջ", transliteration_ru: "дж", mnemonic: "Джип с колесами.", emoji: "🚙" },
  { id: "ռ", printed: "Ռ ռ", transliteration_ru: "р (тв)", mnemonic: "Ракета взлетает.", emoji: "🚀" },
  { id: "ս", printed: "Ս ս", transliteration_ru: "с", mnemonic: "Сосуд (С).", emoji: "🏺" },
  { id: "վ", printed: "Վ վ", transliteration_ru: "в", mnemonic: "Ваза.", emoji: "🏺" },
  { id: "տ", printed: "Տ տ", transliteration_ru: "т", mnemonic: "Топор.", emoji: "🪓" },
  { id: "ր", printed: "Ր ր", transliteration_ru: "р (мягк)", mnemonic: "Росток.", emoji: "🌱" },
  { id: "ց", printed: "Ց ց", transliteration_ru: "ц (придых)", mnemonic: "Цапля на одной ноге.", emoji: "🦩" },
  { id: "ւ", printed: "Ւ ւ", transliteration_ru: "в/у", mnemonic: "Улитка.", emoji: "🐌" },
  { id: "փ", printed: "Փ փ", transliteration_ru: "п (придых)", mnemonic: "Парашют.", emoji: "🪂" },
  { id: "ք", printed: "Ք ք", transliteration_ru: "к (придых)", mnemonic: "Ключ.", emoji: "🗝️" },
  { id: "օ", printed: "Օ օ", transliteration_ru: "о", mnemonic: "Обруч.", emoji: "⭕" },
  { id: "ֆ", printed: "Ֆ ֆ", transliteration_ru: "ф", mnemonic: "Фонарь.", emoji: "🏮" },
  { id: "և", printed: "և", transliteration_ru: "ев", mnemonic: "Амперсанд (и).", emoji: "➕" }
];

const WORDS_DATA = [
  { word: "սա", translation_ru: "это", transliteration_ru: "са", letters_used: ["ս", "ա"] },
  { word: "սար", translation_ru: "гора", transliteration_ru: "сар", letters_used: ["ս", "ա", "ր"] },
  { word: "կին", translation_ru: "женщина", transliteration_ru: "кин", letters_used: ["կ", "ի", "ն"] },
  { word: "կար", translation_ru: "был", transliteration_ru: "кар", letters_used: ["կ", "ա", "ր"] },
  { word: "սան", translation_ru: "крестник", transliteration_ru: "сан", letters_used: ["ս", "ա", "ն"] },
  { word: "նկար", translation_ru: "картина", transliteration_ru: "нкар", letters_used: ["ն", "կ", "ա", "ր"] },
  { word: "բառ", translation_ru: "слово", transliteration_ru: "бар", letters_used: ["բ", "ա", "ռ"] },
  { word: "բանկ", translation_ru: "банк", transliteration_ru: "банк", letters_used: ["բ", "ա", "ն", "կ"] },
  { word: "գիրք", translation_ru: "книга", transliteration_ru: "гирк", letters_used: ["գ", "ի", "ր", "ք"] },
  { word: "բարի", translation_ru: "добрый", transliteration_ru: "бари", letters_used: ["բ", "ա", "ր", "ի"] },
  { word: "գաթա", translation_ru: "гата (сладость)", transliteration_ru: "гата", letters_used: ["գ", "ա", "թ"] },
  { word: "ես", translation_ru: "я", transliteration_ru: "ес", letters_used: ["ե", "ս"] },
  { word: "մեղր", translation_ru: "мёд", transliteration_ru: "мехр", letters_used: ["մ", "ե", "ղ", "ր"] },
  { word: "շաքար", translation_ru: "сахар", transliteration_ru: "шакар", letters_used: ["շ", "ա", "ք", "ա", "ր"] },
  { word: "գիշեր", translation_ru: "ночь", transliteration_ru: "гишер", letters_used: ["գ", "ի", "շ", "ե", "ր"] },
  { word: "աստղ", translation_ru: "звезда", transliteration_ru: "астх", letters_used: ["ա", "ս", "տ", "ղ"] },
  { word: "կարմիր", translation_ru: "красный", transliteration_ru: "кармир", letters_used: ["կ", "ա", "ր", "մ", "ի"] },
  { word: "սև", translation_ru: "черный", transliteration_ru: "сев", letters_used: ["ս", "և"] },
  { word: "սպիտակ", translation_ru: "белый", transliteration_ru: "спитак", letters_used: ["ս", "պ", "ի", "տ", "ա", "կ"] },
  { word: "կապույտ", translation_ru: "синий", transliteration_ru: "капуйт", letters_used: ["կ", "ա", "պ", "ո", "ւ", "յ", "տ"] },
  { word: "կանաչ", translation_ru: "зеленый", transliteration_ru: "канач", letters_used: ["կ", "ա", "ն", "ա", "չ"] },
  { word: "դեղին", translation_ru: "желтый", transliteration_ru: "дегхин", letters_used: ["դ", "ե", "ղ", "ի", "ն"] },
  { word: "ոսկի", translation_ru: "золото", transliteration_ru: "воски", letters_used: ["ո", "ս", "կ", "ի"] },
  { word: "արծաթ", translation_ru: "серебро", transliteration_ru: "арцат", letters_used: ["ա", "ր", "ծ", "ա", "թ"] },
  { word: "նախաճաշ", translation_ru: "завтрак", transliteration_ru: "нахачаш", letters_used: ["ն", "ա", "խ", "ճ", "շ"] },
  { word: "ճաշ", translation_ru: "обед", transliteration_ru: "чаш", letters_used: ["ճ", "ա", "շ"] },
  { word: "կատու", translation_ru: "кошка", transliteration_ru: "кату", letters_used: ["կ", "ա", "տ", "ո", "ւ"] },
  { word: "հա", translation_ru: "да", transliteration_ru: "ха", letters_used: ["հ", "ա"] },
  { word: "չէ", translation_ru: "нет", transliteration_ru: "че", letters_used: ["չ", "է"] },
  { word: "մերսի", translation_ru: "спасибо", transliteration_ru: "мерси", letters_used: ["մ", "ե", "ր", "ս", "ի"] },
  { word: "բարև", translation_ru: "привет", transliteration_ru: "барев", letters_used: ["բ", "ա", "ր", "և"] },
  { word: "լավ", translation_ru: "хорошо", transliteration_ru: "лав", letters_used: ["լ", "ա", "վ"] },
  { word: "վատ", translation_ru: "плохо", transliteration_ru: "ват", letters_used: ["վ", "ա", "տ"] },
  { word: "խնդրեմ", translation_ru: "пожалуйста", transliteration_ru: "хндрем", letters_used: ["խ", "ն", "դ", "ր", "ե", "մ"] },
  { word: "այո", translation_ru: "да (офиц.)", transliteration_ru: "айо", letters_used: ["ա", "յ", "ո"] },
  { word: "ոչ", translation_ru: "нет (офиц.)", transliteration_ru: "воч", letters_used: ["ո", "չ"] },
  { word: "տուն", translation_ru: "дом", transliteration_ru: "тун", letters_used: ["տ", "ո", "ւ", "ն"] },
  { word: "փող", translation_ru: "деньги", transliteration_ru: "пох", letters_used: ["փ", "ո", "ղ"] },
  { word: "շատ", translation_ru: "много/очень", transliteration_ru: "шат", letters_used: ["շ", "ա", "տ"] },
  { word: "քիչ", translation_ru: "мало", transliteration_ru: "кич", letters_used: ["ք", "ի", "չ"] },
  { word: "ինչ", translation_ru: "что", transliteration_ru: "инч", letters_used: ["ի", "ն", "չ"] },
  { word: "ով", translation_ru: "кто", transliteration_ru: "ов", letters_used: ["ո", "վ"] },
  { word: "ուր", translation_ru: "где/куда", transliteration_ru: "ур", letters_used: ["ո", "ւ", "ր"] },
  { word: "հիմա", translation_ru: "сейчас", transliteration_ru: "хима", letters_used: ["հ", "ի", "մ", "ա"] },
  { word: "վաղը", translation_ru: "завтра", transliteration_ru: "вагхы", letters_used: ["վ", "ա", "ղ", "ը"] },
  { word: "այսօր", translation_ru: "сегодня", transliteration_ru: "айсор", letters_used: ["ա", "յ", "ս", "օ", "ր"] },
  { word: "շնորհակալություն", translation_ru: "благодарю", transliteration_ru: "шноракалутюн", letters_used: ["շ", "ն", "ո", "ր", "հ", "ա", "կ", "լ", "ո", "ւ", "թ", "յ", "ն"] },
  { word: "ջուր", translation_ru: "вода", transliteration_ru: "джур", letters_used: ["ջ", "ո", "ւ", "ր"] },
  { word: "հաց", translation_ru: "хлеб", transliteration_ru: "хац", letters_used: ["հ", "ա", "ց"] },
  { word: "գինի", translation_ru: "вино", transliteration_ru: "гини", letters_used: ["գ", "ի", "ն", "ի"] },
  { word: "միս", translation_ru: "мясо", transliteration_ru: "мис", letters_used: ["մ", "ի", "ս"] },
  { word: "պանիր", translation_ru: "сыр", transliteration_ru: "панир", letters_used: ["պ", "ա", "ն", "ի", "ր"] },
  { word: "ձուկ", translation_ru: "рыба", transliteration_ru: "дзук", letters_used: ["ձ", "ո", "ւ", "կ"] },
  { word: "սուրճ", translation_ru: "кофе", transliteration_ru: "сурч", letters_used: ["ս", "ո", "ւ", "ր", "ճ"] },
  { word: "թեյ", translation_ru: "чай", transliteration_ru: "тей", letters_used: ["թ", "ե", "յ"] },
  { word: "կաթ", translation_ru: "молоко", transliteration_ru: "кат", letters_used: ["կ", "ա", "թ"] },
  { word: "կարագ", translation_ru: "сливочное масло", transliteration_ru: "караг", letters_used: ["կ", "ա", "ր", "գ"] },
  { word: "ձու", translation_ru: "яйцо", transliteration_ru: "дзу", letters_used: ["ձ", "ո", "ւ"] },
  { word: "աղ", translation_ru: "соль", transliteration_ru: "ах", letters_used: ["ա", "ղ"] },
  { word: "խնձոր", translation_ru: "яблоко", transliteration_ru: "хндзор", letters_used: ["խ", "ն", "ձ", "ո", "ր"] },
  { word: "տանձ", translation_ru: "груша", transliteration_ru: "тандз", letters_used: ["տ", "ա", "ն", "ձ"] },
  { word: "լոլիկ", translation_ru: "помидор", transliteration_ru: "лолик", letters_used: ["լ", "ո", "ի", "կ"] },
  { word: "վարունգ", translation_ru: "огурец", transliteration_ru: "варунг", letters_used: ["վ", "ա", "ր", "ո", "ւ", "ն", "գ"] },
  { word: "սոխ", translation_ru: "лук", transliteration_ru: "сох", letters_used: ["ս", "ո", "խ"] },
  { word: "սխտոր", translation_ru: "чеснок", transliteration_ru: "схтор", letters_used: ["ս", "խ", "տ", "ո", "ր"] },
  { word: "ջերմ", translation_ru: "тепло", transliteration_ru: "джерм", letters_used: ["ջ", "ե", "ր", "մ"] },
  { word: "տաք", translation_ru: "горячо", transliteration_ru: "так", letters_used: ["տ", "ա", "ք"] },
  { word: "սառը", translation_ru: "холодно", transliteration_ru: "сары", letters_used: ["ս", "ա", "ռ", "ը"] },
  { word: "էժան", translation_ru: "дешево", transliteration_ru: "эжан", letters_used: ["է", "ժ", "ա", "ն"] },
  { word: "թանկ", translation_ru: "дорого", transliteration_ru: "танк", letters_used: ["թ", "ա", "ն", "կ"] },
  { word: "գին", translation_ru: "цена", transliteration_ru: "гин", letters_used: ["գ", "ի", "ն"] },
  { word: "խանութ", translation_ru: "магазин", transliteration_ru: "ханут", letters_used: ["խ", "ա", "ն", "ո", "ւ", "թ"] },
  { word: "շուկա", translation_ru: "рынок", transliteration_ru: "шука", letters_used: ["շ", "ո", "ւ", "կ", "ա"] },
  { word: "դեղ", translation_ru: "лекарство", transliteration_ru: "дех", letters_used: ["դ", "ե", "ղ"] },
  { word: "դեղատուն", translation_ru: "аптека", transliteration_ru: "дехатун", letters_used: ["դ", "ե", "ղ", "ա", "տ", "ո", "ւ", "ն"] },
  { word: "բժիշկ", translation_ru: "врач", transliteration_ru: "бжишк", letters_used: ["բ", "ժ", "ի", "շ", "կ"] },
  { word: "հիվանդ", translation_ru: "больной", transliteration_ru: "хиванд", letters_used: ["հ", "ի", "վ", "ա", "ն", "դ"] },
  { word: "մարդ", translation_ru: "человек", transliteration_ru: "март", letters_used: ["մ", "ա", "ր", "դ"] },
  { word: "տղամարդ", translation_ru: "мужчина", transliteration_ru: "тхамарт", letters_used: ["տ", "ղ", "ա", "մ", "ր", "դ"] },
  { word: "տղա", translation_ru: "мальчик", transliteration_ru: "тха", letters_used: ["տ", "ղ", "ա"] },
  { word: "աղջիկ", translation_ru: "девочка", transliteration_ru: "ахчик", letters_used: ["ա", "ղ", "ջ", "ի", "կ"] },
  { word: "երեխա", translation_ru: "ребенок", transliteration_ru: "ереха", letters_used: ["ե", "ր", "խ", "ա"] },
  { word: "մայր", translation_ru: "мать", transliteration_ru: "майр", letters_used: ["մ", "ա", "յ", "ր"] },
  { word: "հայր", translation_ru: "отец", transliteration_ru: "хайр", letters_used: ["հ", "ա", "յ", "ր"] },
  { word: "քույր", translation_ru: "сестра", transliteration_ru: "куйр", letters_used: ["ք", "ո", "ւ", "յ", "ր"] },
  { word: "եղբայր", translation_ru: "брат", transliteration_ru: "ехбайр", letters_used: ["ե", "ղ", "բ", "ա", "յ", "ր"] },
  { word: "ընտանիք", translation_ru: "семья", transliteration_ru: "ынтаник", letters_used: ["ը", "ն", "տ", "ա", "ի", "ք"] },
  { word: "տատիկ", translation_ru: "бабушка", transliteration_ru: "татик", letters_used: ["տ", "ա", "ի", "կ"] },
  { word: "պապիկ", translation_ru: "дедушка", transliteration_ru: "папик", letters_used: ["պ", "ա", "ի", "կ"] },
  { word: "ընկեր", translation_ru: "друг", transliteration_ru: "ынкер", letters_used: ["ը", "ն", "կ", "ե", "ր"] },
  { word: "լույս", translation_ru: "свет", transliteration_ru: "луйс", letters_used: ["լ", "ո", "ւ", "յ", "ս"] },
  { word: "մութ", translation_ru: "темнота", transliteration_ru: "мут", letters_used: ["մ", "ո", "ւ", "թ"] },
  { word: "օր", translation_ru: "день", transliteration_ru: "ор", letters_used: ["օ", "ր"] },
  { word: "առավոտ", translation_ru: "утро", transliteration_ru: "аравот", letters_used: ["ա", "ռ", "վ", "ո", "տ"] },
  { word: "երեկո", translation_ru: "вечер", transliteration_ru: "ереко", letters_used: ["ե", "ր", "կ", "ո"] },
  { word: "ժամ", translation_ru: "час", transliteration_ru: "жам", letters_used: ["ժ", "ա", "մ"] },
  { word: "րոպե", translation_ru: "минута", transliteration_ru: "ропе", letters_used: ["ր", "ո", "պ", "ե"] },
  { word: "շաբաթ", translation_ru: "неделя", transliteration_ru: "шабат", letters_used: ["շ", "ա", "բ", "թ"] },
  { word: "ամիս", translation_ru: "месяц", transliteration_ru: "амис", letters_used: ["ա", "մ", "ի", "ս"] },
  { word: "տարի", translation_ru: "год", transliteration_ru: "тари", letters_used: ["տ", "ա", "ր", "ի"] },
  { word: "երեկ", translation_ru: "вчера", transliteration_ru: "ерек", letters_used: ["ե", "ր", "կ"] },
  { word: "հետո", translation_ru: "потом", transliteration_ru: "хето", letters_used: ["հ", "ե", "տ", "ո"] },
  { word: "արագ", translation_ru: "быстро", transliteration_ru: "араг", letters_used: ["ա", "ր", "գ"] },
  { word: "դանդաղ", translation_ru: "медленно", transliteration_ru: "дандах", letters_used: ["դ", "ա", "ն", "ղ"] },
  { word: "մեծ", translation_ru: "большой", transliteration_ru: "мец", letters_used: ["մ", "ե", "ծ"] },
  { word: "փոքր", translation_ru: "маленький", transliteration_ru: "покр", letters_used: ["փ", "ո", "ք", "ր"] },
  { word: "նոր", translation_ru: "новый", transliteration_ru: "нор", letters_used: ["ն", "ո", "ր"] },
  { word: "հին", translation_ru: "старый", transliteration_ru: "хин", letters_used: ["հ", "ի", "ն"] },
  { word: "գեղեցիկ", translation_ru: "красивый", transliteration_ru: "гехецик", letters_used: ["գ", "ե", "ղ", "ց", "ի", "կ"] },
  { word: "տգեղ", translation_ru: "некрасивый", transliteration_ru: "тгех", letters_used: ["տ", "գ", "ե", "ղ"] },
  { word: "երջանիկ", translation_ru: "счастливый", transliteration_ru: "ержаник", letters_used: ["ե", "ր", "ջ", "ա", "ն", "ի", "կ"] },
  { word: "տխուր", translation_ru: "грустный", transliteration_ru: "тхур", letters_used: ["տ", "խ", "ո", "ւ", "ր"] },
  { word: "հոգնած", translation_ru: "уставший", transliteration_ru: "хогнац", letters_used: ["հ", "ո", "գ", "ն", "ա", "ծ"] },
  { word: "մաքուր", translation_ru: "чистый", transliteration_ru: "макур", letters_used: ["մ", "ա", "ք", "ո", "ւ", "ր"] },
  { word: "կեղտոտ", translation_ru: "грязный", transliteration_ru: "кехтот", letters_used: ["կ", "ե", "ղ", "տ", "ո"] },
  { word: "դժվար", translation_ru: "сложный", transliteration_ru: "джвар", letters_used: ["դ", "ժ", "վ", "ա", "ր"] },
  { word: "հեշտ", translation_ru: "легкий", transliteration_ru: "хешт", letters_used: ["հ", "ե", "շ", "տ"] },
  { word: "ծանր", translation_ru: "тяжелый", transliteration_ru: "цанр", letters_used: ["ծ", "ա", "ն", "ր"] },
  { word: "բաց", translation_ru: "открытый", transliteration_ru: "бац", letters_used: ["բ", "ա", "ց"] },
  { word: "փակ", translation_ru: "закрытый", transliteration_ru: "пак", letters_used: ["փ", "ա", "կ"] },
  { word: "այստեղ", translation_ru: "здесь", transliteration_ru: "айстех", letters_used: ["ա", "յ", "ս", "տ", "ե", "ղ"] },
  { word: "այնտեղ", translation_ru: "там", transliteration_ru: "айнтех", letters_used: ["ա", "յ", "ն", "տ", "ե", "ղ"] },
  { word: "մոտ", translation_ru: "близко", transliteration_ru: "мот", letters_used: ["մ", "ո", "տ"] },
  { word: "հեռու", translation_ru: "далеко", transliteration_ru: "херу", letters_used: ["հ", "ե", "ռ", "ո", "ւ"] },
  { word: "աջ", translation_ru: "право", transliteration_ru: "ач", letters_used: ["ա", "ջ"] },
  { word: "ձախ", translation_ru: "лево", transliteration_ru: "дзах", letters_used: ["ձ", "ա", "խ"] },
  { word: "վերև", translation_ru: "вверх", transliteration_ru: "верев", letters_used: ["վ", "ե", "ր", "և"] },
  { word: "ներքև", translation_ru: "вниз", transliteration_ru: "неркев", letters_used: ["ն", "ե", "ր", "ք", "և"] },
  { word: "գնա", translation_ru: "иди", transliteration_ru: "гна", letters_used: ["գ", "ն", "ա"] },
  { word: "արի", translation_ru: "иди сюда", transliteration_ru: "ари", letters_used: ["ա", "ր", "ի"] },
  { word: "կեր", translation_ru: "ешь", transliteration_ru: "кер", letters_used: ["կ", "ե", "ր"] },
  { word: "խմիր", translation_ru: "пей", transliteration_ru: "хмир", letters_used: ["խ", "մ", "ի", "ր"] },
  { word: "արա", translation_ru: "делай", transliteration_ru: "ара", letters_used: ["ա", "ր"] },
  { word: "տուր", translation_ru: "дай", transliteration_ru: "тур", letters_used: ["տ", "ո", "ւ", "ր"] },
  { word: "առ", translation_ru: "бери/купи", transliteration_ru: "ар", letters_used: ["ա", "ռ"] },
  { word: "բացիր", translation_ru: "открой", transliteration_ru: "бацир", letters_used: ["բ", "ա", "ց", "ի", "ր"] },
  { word: "փակիր", translation_ru: "закрой", transliteration_ru: "пакир", letters_used: ["փ", "ա", "կ", "ի", "ր"] },
  { word: "ասա", translation_ru: "скажи", transliteration_ru: "аса", letters_used: ["ա", "ս"] },
  { word: "խոսիր", translation_ru: "говори", transliteration_ru: "хосир", letters_used: ["խ", "ո", "ս", "ի", "ր"] },
  { word: "լսիր", translation_ru: "слушай", transliteration_ru: "лсир", letters_used: ["լ", "ս", "ի", "ր"] },
  { word: "նայիր", translation_ru: "смотри", transliteration_ru: "найир", letters_used: ["ն", "ա", "յ", "ի", "ր"] },
  { word: "կարդա", translation_ru: "читай", transliteration_ru: "карда", letters_used: ["կ", "ա", "ր", "դ"] },
  { word: "գրիր", translation_ru: "пиши", transliteration_ru: "грир", letters_used: ["գ", "ր", "ի"] },
  { word: "սպասիր", translation_ru: "жди", transliteration_ru: "спасир", letters_used: ["ս", "պ", "ա", "ի", "ր"] },
  { word: "կանգնիր", translation_ru: "остановись", transliteration_ru: "кангнир", letters_used: ["կ", "ա", "ն", "գ", "ի", "ր"] },
  { word: "նստիր", translation_ru: "садись", transliteration_ru: "нстир", letters_used: ["ն", "ս", "տ", "ի", "ր"] },
  { word: "ելիր", translation_ru: "вставай", transliteration_ru: "елир", letters_used: ["ե", "լ", "ի", "ր"] },
  { word: "դու", translation_ru: "ты", transliteration_ru: "ду", letters_used: ["դ", "ո", "ւ"] },
  { word: "մենք", translation_ru: "мы", transliteration_ru: "менк", letters_used: ["մ", "ե", "ն", "ք"] },
  { word: "դուք", translation_ru: "вы", transliteration_ru: "дук", letters_used: ["դ", "ո", "ւ", "ք"] },
  { word: "նրանք", translation_ru: "они", transliteration_ru: "нранк", letters_used: ["ն", "ր", "ա", "ք"] },
  { word: "իմ", translation_ru: "мой", transliteration_ru: "им", letters_used: ["ի", "մ"] },
  { word: "քո", translation_ru: "твой", transliteration_ru: "ко", letters_used: ["ք", "ո"] },
  { word: "դա", translation_ru: "то", transliteration_ru: "да", letters_used: ["դ", "ա"] },
  { word: "որտեղ", translation_ru: "где", transliteration_ru: "вортех", letters_used: ["ո", "ր", "տ", "ե", "ղ"] },
  { word: "երբ", translation_ru: "когда", transliteration_ru: "ерп", letters_used: ["ե", "ր", "բ"] },
  { word: "ինչու", translation_ru: "почему", transliteration_ru: "инчу", letters_used: ["ի", "ն", "չ", "ո", "ւ"] },
  { word: "քանի", translation_ru: "сколько", transliteration_ru: "кани", letters_used: ["ք", "ա", "ն", "ի"] },
  { word: "շուն", translation_ru: "собака", transliteration_ru: "шун", letters_used: ["շ", "ո", "ւ", "ն"] },
  { word: "շենք", translation_ru: "здание", transliteration_ru: "шенк", letters_used: ["շ", "ե", "ն", "ք"] },
  { word: "դուռ", translation_ru: "дверь", transliteration_ru: "дур", letters_used: ["դ", "ո", "ւ", "ռ"] },
  { word: "պատուհան", translation_ru: "окно", transliteration_ru: "патухан", letters_used: ["պ", "ա", "տ", "ո", "ւ", "հ", "ն"] },
  { word: "սեղան", translation_ru: "стол", transliteration_ru: "сехан", letters_used: ["ս", "ե", "ղ", "ա", "ն"] },
  { word: "աթոռ", translation_ru: "стул", transliteration_ru: "атор", letters_used: ["ա", "թ", "ո", "ռ"] },
  { word: "բանալի", translation_ru: "ключ", transliteration_ru: "банали", letters_used: ["բ", "ա", "ն", "լ", "ի"] },
  { word: "ակնոց", translation_ru: "очки", transliteration_ru: "акноц", letters_used: ["ա", "կ", "ն", "ո", "ց"] },
  { word: "գումար", translation_ru: "сумма", transliteration_ru: "гумар", letters_used: ["գ", "ո", "ւ", "մ", "ա", "ր"] },
  { word: "մանր", translation_ru: "мелочь", transliteration_ru: "манр", letters_used: ["մ", "ա", "ն", "ր"] }
];

const INITIAL_SRS_STATE = {
  interval: 0,
  easeFactor: 2.5,
  repetitions: 0,
  nextReviewDate: new Date().toISOString()
};

function calculateNextReview(currentState, quality) {
  let { interval, easeFactor, repetitions } = currentState || INITIAL_SRS_STATE;

  if (quality >= 1) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  easeFactor = easeFactor + (0.1 - (2 - quality) * (0.08 + (2 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return { interval, easeFactor, repetitions, nextReviewDate: nextDate.toISOString() };
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(error);
    }
  };
  return [storedValue, setValue];
}

const generateReadingPassage = (knownLetters) => {
  return WORDS_DATA.filter(wordObj => 
    wordObj.letters_used.every(letter => knownLetters.includes(letter))
  );
};

const LetterIntroCard = ({ letterData, onNext }) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="flex flex-col h-full animate-fade-in w-full max-w-sm mx-auto">
      <div className="flex-1 overflow-y-auto pb-6">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Новая буква</h2>
        
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center border border-white/10 mb-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4 drop-shadow-lg relative z-10">{letterData.printed}</span>
          
          <div className="flex items-center gap-4 mb-2 relative z-10">
            <span className="text-2xl text-amber-400 font-bold tracking-wide">"{letterData.transliteration_ru}"</span>
          </div>
        </div>

        <div className="mb-6">
          {!showHint ? (
            <button 
              onClick={() => setShowHint(true)}
              className="w-full py-4 flex items-center justify-center gap-2 text-indigo-300 bg-indigo-500/10 rounded-2xl hover:bg-indigo-500/20 transition-all border border-indigo-500/20 backdrop-blur-md"
            >
              <Lightbulb size={20} />
              Показать мнемо-подсказку
            </button>
          ) : (
            <div className="p-6 bg-white/[0.05] border border-white/10 rounded-2xl animate-fade-in text-center backdrop-blur-md flex flex-col items-center">
              <span className="text-6xl mb-3 drop-shadow-md">{letterData.emoji}</span>
              <p className="text-indigo-200 text-lg font-medium">{letterData.mnemonic}</p>
            </div>
          )}
        </div>
      </div>

      <button onClick={onNext} className="w-full py-4.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold tracking-wide rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-white/10">
        Понятно, дальше <ChevronRight size={20} />
      </button>
    </div>
  );
};

const ExerciseQuiz = ({ wordObj, onAnswer }) => {
  const generateOptions = (correct) => {
    const options = [correct];
    // Берем варианты для неправильных ответов и из слов, и из самих букв (для первых уроков)
    const allTranslit = [...WORDS_DATA.map(w => w.transliteration_ru), ...LETTERS_DATA.map(l => l.transliteration_ru)];
    
    // Shuffle and pick 3 more unique wrong answers
    const shuffledWrong = allTranslit.filter(t => t !== correct).sort(() => Math.random() - 0.5);
    for (let i = 0; i < 3 && i < shuffledWrong.length; i++) {
        options.push(shuffledWrong[i]);
    }
    return options.sort(() => Math.random() - 0.5); // Shuffle final 4
  };

  const [options] = useState(() => generateOptions(wordObj.transliteration_ru));
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const addArmenianStress = (word, translation) => {
    // Не ставим ударение, если это просто буква
    if (!word || translation === "звук буквы") return word;
    
    // Армянские гласные для ударения (включая ւ для дифтонга ու и և)
    const vowels = ['ա', 'ե', 'է', 'ը', 'ի', 'ո', 'օ', 'ւ', 'և', 'Ա', 'Ե', 'Է', 'Ը', 'Ի', 'Ո', 'Օ', 'Ւ'];
    for (let i = word.length - 1; i >= 0; i--) {
      if (vowels.includes(word[i])) {
        // Вставляем знак ударения сразу после последней гласной
        return word.slice(0, i + 1) + '՛' + word.slice(i + 1);
      }
    }
    return word;
  };

  const capitalize = (str) => {
    if (!str) return str;
    // Если это упражнение на букву, мы оставляем тот регистр (заглавный или строчный), который сгенерирован
    if (wordObj.translation_ru === "звук буквы") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSelect = (opt) => {
    if (selected) return;
    setSelected(opt);
    const correct = opt === wordObj.transliteration_ru;
    setIsCorrect(correct);
    setTimeout(() => onAnswer(correct ? 2 : 0), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in w-full max-w-sm mx-auto relative z-10">
      <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-indigo-300 uppercase tracking-[0.2em] mb-10 shadow-sm backdrop-blur-sm">Как это читается?</span>
      
      <div className="relative mb-10 group flex flex-col items-center">
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-serif drop-shadow-2xl mb-3">
          {capitalize(addArmenianStress(wordObj.word, wordObj.translation_ru))}
        </div>
        <div className="relative text-xl text-amber-400/90 font-bold tracking-wide">({wordObj.translation_ru})</div>
      </div>

      <div className="w-full grid gap-4">
        {options.map((opt, idx) => {
          let btnClass = "bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.08] hover:border-white/20";
          if (selected === opt) {
            btnClass = isCorrect 
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
              : "bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]";
          } else if (selected && opt === wordObj.transliteration_ru) {
            btnClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 border-dashed"; 
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              className={`w-full py-4 text-lg font-bold rounded-2xl border backdrop-blur-sm transition-all duration-300 ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className={`mt-8 px-6 py-3 rounded-2xl flex items-center gap-3 font-bold animate-fade-in backdrop-blur-md border ${isCorrect ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
          {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
          <span className="text-lg">{isCorrect ? 'Верно!' : `Правильно: ${wordObj.transliteration_ru}`}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [progress, setProgress] = useLocalStorage('armenian_reader_progress_v2', {
    hasSeenOnboarding: false,
    learnedLettersIds: [],
    srsData: {} 
  });

  const [currentScreen, setCurrentScreen] = useState(progress.hasSeenOnboarding ? 'map' : 'onboarding');
  const [activeLesson, setActiveLesson] = useState(null); 
  const [lessonStep, setLessonStep] = useState(0); 
  const [lessonExercises, setLessonExercises] = useState([]);
  const [mistakesCount, setMistakesCount] = useState(0);

  const getPriority = (word) => {
    const srs = progress.srsData[word];
    if (!srs) return 100;
    const now = new Date();
    const next = new Date(srs.nextReviewDate);
    if (now > next) return 200;
    return 10;
  };

  if (currentScreen === 'onboarding') {
    return (
      <Layout>
        <div className="flex flex-col h-full items-center justify-center text-center px-4 relative z-10">
          <div className="relative w-32 h-32 mb-10 flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
            <div className="relative w-full h-full bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl text-white font-serif">Ա</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-6 tracking-tight">Читаю по-армянски</h1>
          <p className="text-indigo-200/70 mb-12 max-w-sm text-lg leading-relaxed">
            Мы не будем сразу учить грамматику. Наша цель — быстро научить вас читать.
          </p>
          <button 
            onClick={() => {
              setProgress({ ...progress, hasSeenOnboarding: true });
              setCurrentScreen('map');
            }}
            className="w-full max-w-sm py-4.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-lg font-bold tracking-wide rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 border border-white/10"
          >
            Начать обучение
          </button>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'map') {
    return (
      <Layout>
        <div className="pb-8 relative z-10">
          <header className="mb-10 pt-6 px-2 flex justify-between items-end border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Алфавит</h1>
              <p className="text-indigo-300/70 text-sm font-medium tracking-wider uppercase">Изучено: {progress.learnedLettersIds.length} / {LETTERS_DATA.length}</p>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-4 px-2">
            {LETTERS_DATA.map((letter, idx) => {
              // FOR TESTING: all letters unlocked. 
              const isLearned = progress.learnedLettersIds.includes(letter.id);
              const isNext = !isLearned && (idx === 0 || progress.learnedLettersIds.includes(LETTERS_DATA[idx-1].id));
              const isLocked = false; // Always unlocked for testing purposes

              let btnStyle = "bg-white/[0.02] border-white/5 text-slate-500";
              if (isLearned) btnStyle = "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
              if (isNext) btnStyle = "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]";

              return (
                <button
                  key={letter.id}
                  disabled={isLocked}
                  onClick={() => {
                    setActiveLesson(letter.id);
                    setLessonStep(0);
                    setMistakesCount(0);
                    
                    // Generate temp array of all letters up to current for testing
                    const currentIndex = LETTERS_DATA.findIndex(l => l.id === letter.id);
                    const tempKnown = LETTERS_DATA.slice(0, currentIndex + 1).map(l => l.id);
                    const possibleWords = generateReadingPassage(tempKnown);
                    
                    const wordsWithPrio = possibleWords.map(w => ({
                      ...w,
                      _sortVal: getPriority(w.word) + Math.random()
                    }));
                    wordsWithPrio.sort((a, b) => b._sortVal - a._sortVal);

                    const uniqueExercises = [];
                    const seenWords = new Set();
                    for (const w of wordsWithPrio) {
                      if (!seenWords.has(w.word)) {
                        seenWords.add(w.word);
                        uniqueExercises.push(w);
                      }
                    }

                    // Берем до 20 уникальных слов
                    let wordExercises = uniqueExercises.slice(0, 20);

                    // Добавляем 3-5 случайных одиночных букв в разных регистрах, БЕЗ ПОВТОРЕНИЙ
                    const knownLettersData = LETTERS_DATA.slice(0, currentIndex + 1);
                    const numLettersToPick = Math.min(knownLettersData.length, Math.floor(Math.random() * 3) + 3); // от 3 до 5 штук, но не больше чем доступно
                    
                    // Перемешиваем доступные буквы, чтобы выбрать УНИКАЛЬНЫЕ
                    const shuffledKnown = [...knownLettersData].sort(() => Math.random() - 0.5);
                    const selectedLetters = shuffledKnown.slice(0, numLettersToPick);
                    
                    const letterExercises = selectedLetters.map((randomLetter) => {
                      // 50/50 шанс на заглавную или маленькую
                      const isUpper = Math.random() > 0.5; 
                      return {
                        word: isUpper ? randomLetter.id.toUpperCase() : randomLetter.id,
                        translation_ru: "звук буквы",
                        transliteration_ru: randomLetter.transliteration_ru,
                        letters_used: [randomLetter.id]
                      };
                    });

                    // Смешиваем слова и буквы в случайном порядке
                    let exercisesToSet = [...wordExercises, ...letterExercises].sort(() => Math.random() - 0.5);

                    setLessonExercises(exercisesToSet);
                    setCurrentScreen('lesson');
                  }}
                  className={`aspect-square rounded-[1.5rem] border flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-md ${btnStyle} ${!isLocked && 'hover:scale-105 hover:bg-white/10'}`}
                >
                  <span className="text-3xl font-serif mb-1 drop-shadow-md whitespace-nowrap">{letter.printed}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">
                    {isLearned || isNext ? letter.transliteration_ru : '?'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'lesson') {
    const letterObj = LETTERS_DATA.find(l => l.id === activeLesson);
    // Лимит увеличен с 15 до 25 (20 слов + 5 букв), плюс штрафные за ошибки
    const targetLength = Math.min(lessonExercises.length, 25 + (mistakesCount * 2));

    const finishLesson = () => {
      setProgress(prev => ({
        ...prev,
        learnedLettersIds: Array.from(new Set([...prev.learnedLettersIds, letterObj.id]))
      }));
      setCurrentScreen('map');
    };

    const handleExerciseAnswer = (quality) => {
      if (quality === 0) setMistakesCount(m => m + 1);

      const currentWord = lessonExercises[lessonStep - 1];
      
      setProgress(prev => {
        const currentSRS = prev.srsData[currentWord.word] || INITIAL_SRS_STATE;
        const newSRS = calculateNextReview(currentSRS, quality);
        return {
          ...prev,
          srsData: { ...prev.srsData, [currentWord.word]: newSRS }
        };
      });

      if (lessonStep < targetLength) {
        setLessonStep(s => s + 1);
      } else {
        finishLesson();
      }
    };

    return (
      <Layout>
        <div className="flex items-center gap-4 mb-8 relative z-10 pt-2">
          <button 
            onClick={() => setCurrentScreen('map')}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
              style={{ width: `${(lessonStep / (1 + targetLength)) * 100}%` }}
            />
          </div>
        </div>

        {lessonStep === 0 && (
          <LetterIntroCard letterData={letterObj} onNext={() => {
              if (lessonExercises.length > 0) setLessonStep(1);
              else finishLesson();
          }} />
        )}

        {lessonStep > 0 && lessonStep <= targetLength && (
          <ExerciseQuiz 
            wordObj={lessonExercises[lessonStep - 1]} 
            onAnswer={handleExerciseAnswer} 
            key={lessonStep} 
          />
        )}
      </Layout>
    );
  }

  return null;
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 font-sans sm:p-4 selection:bg-indigo-500/30">
      <div className="max-w-md mx-auto bg-[#09090b] sm:bg-[#09090b]/80 sm:backdrop-blur-3xl sm:shadow-2xl sm:rounded-[2.5rem] sm:border border-white/10 min-h-screen sm:min-h-[850px] flex flex-col relative overflow-hidden">
        
        {/* Ambient Lights */}
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[40%] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[30%] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <main className="flex-1 p-6 flex flex-col relative z-10">
          {children}
        </main>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        `}} />
      </div>
    </div>
  );
}