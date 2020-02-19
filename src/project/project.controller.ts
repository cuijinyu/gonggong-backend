import { Controller, Post, Put } from '@nestjs/common';

@Controller('project')
export class ProjectController {
    constructor() {}

    @Post('/create') 
    createProject() {

    }

    @Put('/save')
    saveProjectConfig() {
        
    }

}
