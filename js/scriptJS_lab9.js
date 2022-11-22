let Inp = document.getElementById('input');// инпут
let numb=document.getElementById('number');//кнопки цифры
const button_= document.querySelectorAll("button");//все кнопки
let operation_='';//операция
let num1='';//первый операнд
let num2='';//второй операнд
//для проверки на корректность точки. считает количество вхождений не болше1 в каждое число 
let count1=0;
let count2=0;
//для проверки: запрещает ввод 2х и более операций подряд ( типа ++++ или ****)
let count_=0;
//для проверки ввода отрицательных чисел -num1 
let f=0;


document.querySelectorAll('.button_').forEach(button => {
  button.addEventListener('click', function () {
      // по клику вызывается функция со значением кнопки в качестве параметра
      calc(button);
      
  })
})

// корректность ввода точки (допутима 1 точка в одином числе)
function correct(val, numb, count)
{
  if(count<1 && val.value==".")
  {
    numb+=val.value; //прибавляем точку к числу
    return numb;
  }

}


function calc(val){
{
  //1.если нажата цифра
  if(val.getAttribute('id')==numb.getAttribute('id'))
  {
    val.classList.add('shadow');//добавл класс- подстветки

    //обрабатываем 1ое число num1
    if (Inp.value=='' ||  operation_==''|| Inp.value=='-' ){
    
      //для чисел с плавающей точкой
      if(val.value=='.' && count1<1 && Inp.value!='') 
      {
        num1=correct(val, num1, count1);
        count1=count1+1;
        Inp.value+= val.value;
        
      }
      //для чисел без плавающей точки
      if (val.value!='.'){
        num1+=val.value;
        //console.log('num1=');
        //console.log(`${num1}`);
        Inp.value+= val.value;
      }

    }
    //обрабатываем 2ое число num2
    else{
      if(val.value=='.' && count2<1) 
      {
        num2=correct(val, num2, count2);
        count2=count2+1;
        Inp.value+= val.value;
      }
      if (val.value!='.'){
        num2+=val.value;
        //console.log('num2=');
        //console.log(`${num2}`);
        Inp.value+= val.value;
      }
    }
    
    Inp.style.fontSize='18px';
    Inp.style.fontWeight='bold'
  }

}
//2.если нажата НЕ цифра   
if(val.getAttribute('id')!=numb.getAttribute('id'))
{
  val.classList.remove('shadow');//добавл класс- подстветки  
  //обнуляем проверки на количество точек в числе 
  count1=0;
  count2=0;

  // кнопка С
  if(val.getAttribute('id')==document.getElementById('C').getAttribute('id'))
  {
    Inp.value = '';
    num1='';
    num2='';
    f=0;
    count_=0;
  }

  
  //кнопка операции + - * /
  if(val.getAttribute('id')==document.getElementById('operation').getAttribute('id'))
  {
    //исключаем множественный повтор операций
    if(count_==0 )
    { 
      //для 1го Отриц числа
      if(val.value=='-' && num1!='-' & Inp.value=='')
      {
        num1+=val.value;
        Inp.value+= val.value;
        count_=0;// допустимо, для отрицательного числа 
      }

      //для операции между числами и исклчение --
      if(num1!=''& num1!='-' )
      {
        Inp.value+= val.value;
        operation_=val.value;
        count_=count_+1;
      }
      
    }
    
  }
  
  //если стрелка-удаление одного символа (последнего в инпуте)
    if(val.getAttribute('id')==document.getElementById('arrow').getAttribute('id'))
    {
      let d = Inp.value;
      let temp = d.slice(0, -1);//убираем 1 символ
      
      if (num2!=''){//когда есть 2 операнда и знак операции (затираем 2ой операнд)
        num2 = num2.slice(0,-1);
      }
      else{
        //когда затираем или операцию или Num1
        if(num2=='' && num1!='') {
          if(operation_=='' || operation_=='.'|| count_==0 || Inp.value==num1 & num2=='')
          {
            num1=Inp.value.replace(/.$/, '');
            operation_='';
            
          }
          else{
            num2= num2.replace(/.$/, '');
            operation_='';
            count_=0;  
          }
          
        }
        else{
          count2=0;
          num1= num1.replace(/.$/, '');
          if(num1=='')
          {
            count1=0;
          }
        }
      }

      Inp.value = temp;//вывод в инпут
      /*
      console.log('этоo num2=');
      console.log(`${num2}`);
      console.log('этоo num1=');
      console.log(`${num1}`);
      console.log('этоo operation=');
      console.log(`${operation_}`);
      */
    }
    
    // кнопка равно =
    if (val.getAttribute('id')==document.getElementById('button_equal').getAttribute('id'))
    {
      count_=0;
    
      switch(operation_)
      {
          case "*":
              num2 = num1*num2;
              Inp.value = num2;
              break;
          case '/':
            if(num2==0)
            {
              Inp.value = 'На 0 делить нельзя! Очистите!';
              num2='';
              break;
            } 
            num2 = num1/num2;
            Inp.value = num2;
            break;
          case '+':
              //учитываю числа с плавающей запятой
              num2=(Math.round(num1*100000000)+Math.round(num2*100000000))/100000000;
              Inp.value = num2;
              break;
          case '-':
              num2 = (Math.round(num1*100000000) - Math.round(num2*100000000))/100000000;
              Inp.value = num2;
              break;    
      }
      num1 = num2;
      num2='';
    }
  }

}
  
