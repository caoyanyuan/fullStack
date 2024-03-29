const Router=require('koa-router');

let router=new Router();

//localhost:8080/
router.get('', async ctx=>{
  let page=1;
  let page_size=8;

  let questions=await ctx.db.execute(`
    SELECT Q.ID,Q.title,ANSWER.content AS best_answer_content,AUTHOR.name,AUTHOR.headline FROM

    question_table AS Q
    LEFT JOIN answer_table AS ANSWER ON Q.best_answer_ID=ANSWER.ID
    LEFT JOIN author_table AS AUTHOR ON ANSWER.author_ID=AUTHOR.ID

    LIMIT ${(page-1)*page_size},${page_size}
  `);

  await ctx.render('list', {
    questions
  });
});

//localhost:8080/detail/34546456554
router.get('detail/:id', async ctx=>{
  let {id}=ctx.params;

  let question=(await ctx.db.execute(`SELECT * FROM question_table WHERE ID=${id}`))[0];
  let answers=await ctx.db.execute(`
    SELECT * FROM
    answer_table AS ANSWER
    LEFT JOIN author_table AS AUTHOR ON ANSWER.author_ID=AUTHOR.ID

    WHERE question_ID=${id}
  `);
  question.best_answer=answers[0];
  answers.splice(0, 1);
  let topics=await ctx.db.execute(`SELECT * FROM topic_table WHERE ID IN (${question.topics})`);

  //console.log(question);

  await ctx.render('item', {
    question,
    answers,
    topics
  });
});














module.exports=router.routes();
