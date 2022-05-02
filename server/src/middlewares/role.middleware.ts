import { Request, Response, NextFunction } from 'express'
import { RoleType } from './role.type';

export const Roles = (roles: RoleType[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if(req.method === 'OPTIONS')
                return next();
            const roleClient = req.headers.authorization?.split(' ')[1];
            if(!roleClient)
                return res.status(403).json({message: 'No access'});
            for (const requiredRole of roles)
                if(requiredRole === roleClient)
                    return next();
            return res.status(403).json({message: 'No access'});
        } catch (error) {
            return res.status(403).json({message: 'No access'});
        }
    }
}