import { Body, Controller, Post, Res } from '@nestjs/common';
import { GuidelineCreateDTO } from './GuidelineCreateDTO';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { GuidelineCreateCommand } from '~guideline/application/create';

@Controller('guidelines')
export class GuidelinePostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  async register(@Body() body: GuidelineCreateDTO, @Res() res: Response) {
    const command = new GuidelineCreateCommand(body);

    this.commandBus.execute(command);

    return res.status(201).end();
  }
}
