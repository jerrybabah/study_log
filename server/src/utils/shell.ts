import 'dotenv/config';
import * as repl from 'repl';

const executedRepl = repl.start('>>> ');

executedRepl.context.a = 'a';
