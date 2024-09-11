# Теги

---
##### l
##### расшифровка
link
##### Назначение
ссылка
##### Атрибуты
1. цель ссылки (id, либо адрес) - не обязательный
2. сообщение появляющееся от лица кликающего (текст) - не обязательный
##### Содержимое
Обязательное

##### Примеры
```
$l:ya.ru:Открой поисковик:Поисковик^
$l:http\://ya.ru:Поисковик c экранируемым символом \:^
```
---
##### bn
##### расшифровка
button next
##### Назначение
кнопка Продолжить под сообщением, которая блокирует работу всех ссылок в сообщении, а при нажатии добавляет сообщение из оставшейся части общего до ближайшей следующей кнопки. Т.е. ее задача разбивать сообщения на несколько.
##### Атрибуты
пока нет
##### Содержимое
Не обязательное, будет подставлено значение по умолчанию (определяется агентом)

##### Примеры
```
$bn^
$bn:Продолжить^
```
---
##### n
##### расшифровка
next
##### Назначение
Перенос строки. Аналог тега br в HTML. Может определяться агентом как размер отступа между абзацами и ограничиваться, чтобы вмещать сообщение на одном экране
##### Атрибуты
1. Количество переносов (целые числа от 0 и выше)
2. ?НУЖЕН? Следующая строка не имеет горизонтального отступа (0 [нет] или 1[да]) - не обязательно (0 если не установлено)
##### Содержимое
Не требуется

##### Примеры
```
$n^
$n:2^
```
---
##### c
##### расшифровка
code
##### Назначение
обрамление кода
##### Атрибуты
1. ?НУЖЕН? язык синтаксиса
##### Содержимое
Обязательное

##### Примеры
```
$cfunction { $n:2^}^
```
---
##### d
##### расшифровка
delay
##### Назначение
Задержка перед отрисовкой следующей части текста. Служит для постепенного заполнения сообщения.
##### Атрибуты
1. Время в секундах (числа с плавающей точкой) - не обязательная будет взято значение по-умолчанию определенное агентом
##### Содержимое
Не требуется

##### Примеры
```
Жили-были...$d:2^Не поверите, кто!$d^ Дед и баба.
```
---
##### an
##### расшифровка
animation
##### Назначение
Обрамление анимируемой части сообщения. Работает в паре с тегом a (анимация). Встретив этот тег, агент отрисовывает содержимое тега без изменений и только затем встретив тег a будет изменять его.   
##### Атрибуты
1. Уникальный идентификатор(буквы и цифры) - обязательный
##### Содержимое
Не обязательное

##### Примеры
```
$an:0^Не обрамляет ничего
$an:1:$cfunction { $n:2^}^^
```
---
##### a
##### расшифровка
animating
##### Назначение
Этот тег изменяет содержимое тега an, который отыскивает по id, и тем самым анимирует. Агент может определять способ анимации, чтобы акцентировать внимание пользователя на том месте, где изменился текст. Число тегов **_a_** с одним идентификатором может быть несколько. Они будут запускаться в порядке появления их в сообщении. Каждый тег работает с новой версией изменений и соответственно позиции могут меняться. Это создает проблему ручной записи тегов. Она должна происходить с использованием интерфейса, который позволяет видеть все состояния анимации текста. 
##### Атрибуты
1. Идентификатор(буквы и цифры), который ссылается на тег an с таким же id.
2. Позиция в содержимом тега an, с которой начинаются изменения (целые положительные и отрицательные числа позиция с конца). Теги учитываются их можно так же стирать - не обязательный. При отсутствии изменения будут происходить с конца содержимого. 
3. Количество стираемых символов (положительное число - стирает символы после позиции, отрицательное число - стирает символы перед позицией, буква a - стирает все содержимое) - не обязательное. Если не проставить атрибут, то стирания не будет
##### Содержимое
Не обязательное (дописывает содержимое начиная с заданной позиции во втором атрибуте)

##### Примеры
```
Так создается функция в JavaScript
$an:0^$n^
$an:1:$cfunction { $n:2^}^^
$d^
$a:0:Давайте назовем нашу функцию.^
$d:2^
$a:0:Например, дадим ей имя myFn.^
$a:1:11:myFn ^
$d^
$a:0:a:Теперь мы можем вызвать нашу функцию.^
$a:1:$n^myFn() ^
```