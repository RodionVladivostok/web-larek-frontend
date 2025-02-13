# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack - ок

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


Приложение "Веб-ларек" выполнено в MVP-архитектуре (Model-View-Presenter) с применением брокера событий

# "СЛОЙ МОДЕЛЬ" (Model)

1. Класс AppState - отвечает за состояние приложения.

Содержит следующие поля: 
	catalog: IProduct[] = [] - массив товаров на странице;
	basket: IProduct[] = [] - массив товаров, сложенных в корзину;
	payment: TPayment = null - способ оплаты;
	address: string - адрес доставки;
	email: string - эл. почта;
	phone: string - номер телефона;

Содержит следующие методы:
	setCatalog(products: IProduct[]) - метод получения массива данных (карточек) с сервера;
  addToBasket(value: IProduct) - метод добавления товара в корзину;

# "СЛОЙ ПРЕДСТАВЛЕНИЯ" (View)

1. Класс Basket - отвечает за отображение окна корзины товаров.

Содержит следующие поля: 
	protected _basketList: HTMLUListElement - список товаров в корзине;
	protected _basketItemTemplate: HTMLTemplateElement - шаблон для каждой позиции товара в корзине;
	protected _basketPrice: HTMLSpanElement - общая сумма товаров в корзине;
	protected _basketButton: HTMLButtonElement - кнопка "Оформить";

Содержит следующие методы:
  set products(products: IProduct[]) - сеттер, отвечающий за отображение списка товаров в корзине, отображение/обновление порядковых номеров в списке, деактивацию кнопки "Оформить", отображение общей суммы товаров;

2. Класс BasketItem - отвечает за отображение отдельной позиции товара в окне корзины.

Содержит следующие поля: 
	protected _title: HTMLSpanElement - наименование товара;
	protected _price: HTMLSpanElement - цена товара;
	protected _index: HTMLSpanElement - порядковый номер товара;
	protected _itemDeleteButton: HTMLButtonElement - кнопка с иконкой "Удалить";
	protected _id: string - идентификатор товара;

Содержит следующие методы:
	set product(product: IProduct) - сеттер, отвечающий за отображение наименования товара, отображение цены товара, за назначение уникального номера товара;
	set index(value: number) - сеттер, отвечающий за отображение порядкового номера товара;

3. Класс Contacts - отвечает за отображение окна контактных данных - эл. почты и телефона.

Содержит следующие поля: 
	protected _emailInput: HTMLInputElement - инпут для эл. почты;
	protected _phoneInput: HTMLInputElement - инпут для номера телефона;
	protected _payButton: HTMLButtonElement - кнопка "Оплатить";

Содержит следующие методы:
	validate(data: IContactsFormData) - метод деактивации кнопки "Оплатить" в случае, если хотя бы один из инпутов не заполнен;

4. Класс Gallery - отвечает за отображения всех карточек на странице.

Содержит следующие поля: 
-

Содержит следующие методы:
	set catalog(items: HTMLElement[]) - сеттер, отвечающий за отображение всех карточек на странице;

5. Класс Modal - отвечает за отображение общего (универсального) модального окна или модального окна-контейнера, внутри которого отображается содержание всех остальных модальных окон: корзины, способа оплаты, контактной информации и успешного заказа товара.

Содержит следующие поля: 
	protected _content: HTMLElement - контент внутри модального окна-контейнера;
	protected _closeButton: HTMLButtonElement - кнопка закрытия "Крестик";

Содержит следующие методы:
	set content(value: HTMLElement) - сеттер, отвечающий за отображение контента внутри модального окна-контейнера;
	close() - метод закрытия модального окна-контейнера;
	render(data?: Partial<IModal>): HTMLElement - метод отображения модального окна-контейнера;

6. Класс Order - отвечает за отображение окна оформления заказа.

Содержит следующие поля: 
	protected _cardPayment: HTMLButtonElement - способ оплаты "Онлайн";
	protected _cashPayment: HTMLButtonElement - способ оплаты "При получении";
	protected _addressInput: HTMLInputElement - инпут для адреса доставки;
	protected _orderBtn: HTMLButtonElement - кнопка "Далее";

Содержит следующие методы:
	set payment(payment: TPayment) - сеттер, отвечающий за установку способа оплаты; 
	validate(data: IOrderFormData) - метод деактивации кнопки "Далее"в случае, если не выбран способ оплаты или не заполнен инпут с адресом доставки;

7. Класс Page - отвечает за отображение главной страницы, включая header и все карточки.

Содержит следующие поля: 
	protected _basketCount: HTMLSpanElement - счетчик товаров возле кнопки "Корзина";
	protected _pageWrapper: HTMLDivElement - контейнер для содержимого главной страницы;
	protected _basketButton: HTMLButtonElement - кнопка "Корзина";

Содержит следующие методы:
	set basketCount(value: number) - сеттер, отвечающий за отображение количества товаров возле кнопки "Корзина"
	set locked(value: boolean) - сеттер, отвечающий за блокирование скроллинга на главной странице после открытия модального окна или его разблокирование после закрытия модального окна

7. Класс ProductCard - отвечает за отображение каждой отдельной карточки товара на главной странице.

Содержит следующие поля: 
	protected _title: HTMLHeadElement - наименование товара;
	protected _image: HTMLImageElement - картинка товара;
	protected _price: HTMLSpanElement - цена товара;
	protected _category: HTMLSpanElement - категория товара;
	protected _id: string - идентификатор товара;

Содержит следующие методы:
	set id(value: string) - сеттер, отвечающий за идентификатор товара;
	set title(value: string) - сеттер, отвечающий за наименование товара;
	set price(value: number|null) - сеттер, отвечающий за цену товара;
	set image(value: string) - сеттер, отвечающий за картинку товара;
	set category(value: TCategory) - сеттер, отвечающий за категорию товара;

8. Класс ProductCardPreview - отвечает за отображение окна с подробным описанием выбранной карточки товара.

Содержит следующие поля: 
	protected _category: HTMLSpanElement - категория товара;
	protected _title: HTMLHeadElement - наименование товара;
	protected _image: HTMLImageElement - картинка товара;
	protected _price: HTMLSpanElement - цена товара;
	protected _description: HTMLParagraphElement - описание товара;
	protected _cardButton: HTMLButtonElement - кнопка "В корзину";
	protected _id: string - идентификатор товара;

Содержит следующие методы:
	set id(value: string) - сеттер, отвечающий за идентификатор товара;
	set description(value: string) - сеттер, отвечающий за описание товара;
	set image(value: string) - сеттер, отвечающий за картинку товара;
	set title(value: string) - сеттер, отвечающий за наименование товара;
	set price(value: number|null) - сеттер, отвечающий за цену товара;
	set category(value: TCategory) - сеттер, отвечающий за категорию товара;
	set inBasket(value: boolean) - сеттер, отвечающий за деактивацию кнопки "В корзине" в случае, если данный товар уже находится в корзине;

9. Класс Success - отвечает за отображение окна успешного оформления заказа.

Содержит следующие поля: 
	protected _description: HTMLParagraphElement - описание общей суммы заказа, например, "Списано 1450 синапсов";
	protected _successBtn: HTMLButtonElement - кнопка "За новыми покупками!";

Содержит следующие методы:
	set basket(products: IProduct[]) - сеттер, отвечающий за отображение общей суммы заказа;

# "СЛОЙ ПРЕЗЕНТЕРА" (Presenter)
Код презентера не выделен в отдельный класс, а размещён в основном скрипте приложения (src/index.ts). Применяется событийно-ориентированный подход путем использования брокера событий.

1. Класс EventEmitter - реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

Класс имеет методы on, off, emit — для подписки на событие, отписки от события и уведомления
подписчиков о наступлении события, соответственно.

Перечень событий:

- 'catalog:changed'
- 'basket:order'
- 'card:delete-item'
- 'email:changed'
- 'phone:changed'
- 'basket:success'
- 'modal:close'
- 'payment:change'
- 'address:changed'
- 'basket:contacts'
- 'basket:open'
- 'card:select'
- 'card:to-basket'