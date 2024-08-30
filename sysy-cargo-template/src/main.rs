
use lalrpop_util::lalrpop_mod;
use std::env::args;
use std::io::Result;
use std::fs::{read_to_string, write};
use ir::{GenerateAsm};
// 引用 lalrpop 生成的解析器
// 因为我们刚刚创建了 sysy.lalrpop, 所以模块名是 sysy
lalrpop_mod!(sysy);
pub mod ast_module;

mod ir;


fn main() -> Result<()> {
  // 解析命令行参数
  let mut args = args();
  args.next();
  let _mode = args.next().unwrap();
  let input = args.next().unwrap();
  args.next();
  let output = args.next().unwrap();

  // 读取输入文件
  let input = read_to_string(input)?;
  // parse input file

  let ast = sysy::CompUnitParser::new().parse(&input).unwrap();
  dbg!(&ast);
  // let koopa_code = ast.fmt().unwrap();
  // // 写入输出文件
  // let driver = koopa::front::Driver::from(koopa_code);
  // let program = driver.generate_program().unwrap();
  // let riscv_code = program.generate().unwrap();
  // write(output, riscv_code);
  Ok(())
}